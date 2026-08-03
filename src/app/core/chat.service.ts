import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from './api.config';

export interface ChatMessage {
  id: string;
  body: string;
  fromOwner: boolean;
  createdAt: string;
}

export interface Conversation {
  conversationId: string;
  name: string;
  email: string;
  lastMessage: string;
  lastAt: string;
  unread: number;
}

@Injectable({ providedIn: 'root' })
export class ChatService {
  constructor(private readonly http: HttpClient) {}

  /** Hilo propio; el dueño puede pedir el de una conversación concreta. */
  thread(conversationId?: string): Observable<ChatMessage[]> {
    const qs = conversationId ? `?conversationId=${encodeURIComponent(conversationId)}` : '';
    return this.http.get<ChatMessage[]>(`${API_URL}/messages${qs}`);
  }

  send(body: string, conversationId?: string): Observable<ChatMessage> {
    return this.http.post<ChatMessage>(`${API_URL}/messages`, { body, conversationId });
  }

  /** Bandeja de entrada: solo disponible para el dueño. */
  inbox(): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(`${API_URL}/messages/inbox`);
  }
}
