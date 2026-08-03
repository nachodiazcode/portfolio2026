import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HoverStyleDirective } from '../../directives/hover-style.directive';
import { AuthService } from '../../core/auth.service';
import { ChatService, ChatMessage, Conversation } from '../../core/chat.service';

type View = 'login' | 'register' | 'chat';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, HoverStyleDirective],
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnDestroy {
  @Input() set open(value: boolean) {
    this.isOpen = value;
    if (value) this.onOpen();
    else this.stopPolling();
  }
  @Output() closed = new EventEmitter<void>();

  isOpen = false;
  view: View = 'login';

  // formularios
  name = '';
  email = '';
  password = '';
  draft = '';

  loading = signal(false);
  error = signal('');
  messages = signal<ChatMessage[]>([]);
  conversations = signal<Conversation[]>([]);
  activeConversation: string | null = null;

  private poll: any = null;

  constructor(public readonly auth: AuthService, private readonly chat: ChatService) {}

  ngOnDestroy(): void { this.stopPolling(); }

  get userName(): string { return this.auth.user()?.name ?? ''; }

  close(): void {
    this.error.set('');
    this.closed.emit();
  }

  stop(e: Event): void { e.stopPropagation(); }

  switchTo(v: View): void {
    this.view = v;
    this.error.set('');
  }

  submitAuth(): void {
    if (this.loading()) return;
    this.error.set('');

    const done = {
      next: () => { this.loading.set(false); this.enterChat(); },
      error: (e: any) => {
        this.loading.set(false);
        this.error.set(this.humanize(e));
      },
    };

    this.loading.set(true);
    if (this.view === 'register') {
      this.auth.register(this.name.trim(), this.email.trim(), this.password).subscribe(done);
    } else {
      this.auth.login(this.email.trim(), this.password).subscribe(done);
    }
  }

  send(): void {
    const body = this.draft.trim();
    if (!body || this.loading()) return;

    this.draft = '';
    this.chat.send(body, this.auth.isOwner ? this.activeConversation ?? undefined : undefined)
      .subscribe({
        next: (m) => this.messages.update((list) => [...list, m]),
        error: (e) => { this.draft = body; this.error.set(this.humanize(e)); },
      });
  }

  openConversation(id: string): void {
    this.activeConversation = id;
    this.loadThread();
  }

  backToInbox(): void {
    this.activeConversation = null;
    this.messages.set([]);
    this.loadInbox();
  }

  signOut(): void {
    this.auth.logout();
    this.stopPolling();
    this.messages.set([]);
    this.conversations.set([]);
    this.activeConversation = null;
    this.view = 'login';
    this.password = '';
  }

  // ---------- internos ----------

  private onOpen(): void {
    if (this.auth.user()) this.enterChat();
    else { this.view = 'login'; this.error.set(''); }
  }

  private enterChat(): void {
    this.view = 'chat';
    this.password = '';
    if (this.auth.isOwner) this.loadInbox();
    else this.loadThread();
    this.startPolling();
  }

  private loadThread(): void {
    this.chat.thread(this.auth.isOwner ? this.activeConversation ?? undefined : undefined)
      .subscribe({
        next: (m) => this.messages.set(m),
        error: (e) => this.handleSessionError(e),
      });
  }

  private loadInbox(): void {
    this.chat.inbox().subscribe({
      next: (c) => this.conversations.set(c),
      error: (e) => this.handleSessionError(e),
    });
  }

  /** Refresca cada 6 s para ver respuestas nuevas sin recargar. */
  private startPolling(): void {
    this.stopPolling();
    this.poll = setInterval(() => {
      if (!this.isOpen || this.view !== 'chat') return;
      if (this.auth.isOwner && !this.activeConversation) this.loadInbox();
      else this.loadThread();
    }, 6000);
  }

  private stopPolling(): void {
    if (this.poll) { clearInterval(this.poll); this.poll = null; }
  }

  private handleSessionError(e: any): void {
    if (e?.status === 401) { this.signOut(); this.error.set('Tu sesión expiró. Vuelve a entrar.'); }
    else this.error.set(this.humanize(e));
  }

  private humanize(e: any): string {
    if (e?.status === 0) return 'No se pudo conectar con el servidor. Intenta más tarde.';
    if (e?.status === 429) return 'Demasiados intentos. Espera un momento.';
    const msg = e?.error?.message;
    if (Array.isArray(msg)) return msg[0];
    if (typeof msg === 'string') return msg;
    return 'Algo salió mal. Inténtalo de nuevo.';
  }
}
