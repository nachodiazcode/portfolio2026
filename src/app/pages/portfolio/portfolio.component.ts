import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

import { NavbarComponent } from '../../components/navbar/navbar.component';
import { MenuOverlayComponent } from '../../components/menu-overlay/menu-overlay.component';
import { ExperienceComponent } from '../../components/experience/experience.component';
import { ExperienceModalComponent } from '../../components/experience-modal/experience-modal.component';
import { EducationComponent } from '../../components/education/education.component';
import { AngularTimelineComponent } from '../../components/angular-timeline/angular-timeline.component';
import { CursorComponent } from '../../components/cursor/cursor.component';
import { TestimonialsComponent } from '../../components/testimonials/testimonials.component';
import { MarqueeComponent } from '../../components/marquee/marquee.component';
import { HeroBackgroundComponent } from '../../components/hero-background/hero-background.component';
import { StackBackgroundComponent } from '../../components/stack-background/stack-background.component';
import { PreloaderComponent } from '../../components/preloader/preloader.component';
import { FrameworkVersionsComponent } from '../../components/framework-versions/framework-versions.component';
import { ProjectsComponent } from '../../components/projects/projects.component';
import { BrandLogoComponent } from '../../components/brand-logo/brand-logo.component';

import { WordRevealDirective } from '../../directives/word-reveal.directive';
import { TiltDirective } from '../../directives/tilt.directive';
import { MagneticDirective } from '../../directives/magnetic.directive';
import { ScrollFadeDirective } from '../../directives/scroll-fade.directive';
import { CountUpDirective } from '../../directives/count-up.directive';
import { SpotlightDirective } from '../../directives/spotlight.directive';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

import { AudioService } from '../../services/audio.service';
import { ScrollService } from '../../services/scroll.service';
import { Job } from '../../models/job.model';
import { Profile } from '../../models/profile.model';
import { FRONTEND_PROFILE } from '../../data/profiles/frontend.profile';

/**
 * Plantilla única del portafolio. El contenido y el tema llegan desde el
 * `Profile` que declara cada ruta (ver app.routes.ts): "/" es Frontend y
 * "/fullstack" es el universo Full-Stack.
 */
@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NavbarComponent,
    MenuOverlayComponent,
    ExperienceComponent,
    ExperienceModalComponent,
    EducationComponent,
    AngularTimelineComponent,
    CursorComponent,
    TestimonialsComponent,
    MarqueeComponent,
    HeroBackgroundComponent,
    StackBackgroundComponent,
    PreloaderComponent,
    FrameworkVersionsComponent,
    ProjectsComponent,
    WordRevealDirective,
    TiltDirective,
    MagneticDirective,
    ScrollFadeDirective,
    CountUpDirective,
    SpotlightDirective,
    ScrollRevealDirective,
    BrandLogoComponent
  ],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit, OnDestroy {
  profile: Profile = FRONTEND_PROFILE;
  jobs: Job[] = [];
  selectedJob: Job | null = null;
  menuOpen = false;
  year = new Date().getFullYear();

  /** Hora local de Santiago en vivo (con DST automático) para el panel "Sobre mí". */
  localTime = '';
  private clockTimer?: ReturnType<typeof setInterval>;

  constructor(
    private audioService: AudioService,
    private scroller: ScrollService,
    private route: ActivatedRoute,
    private titleService: Title,
    private meta: Meta
  ) {}

  ngOnInit(): void {
    this.profile = this.route.snapshot.data['profile'] ?? FRONTEND_PROFILE;

    this.titleService.setTitle(this.profile.meta.title);
    this.meta.updateTag({ name: 'description', content: this.profile.meta.description });

    if (this.profile.themeClass) {
      document.body.classList.add(this.profile.themeClass);
    }

    // Las fuentes propias de un perfil se cargan solo cuando ese perfil se
    // visita. El tema cuaderno necesita manuscritas que no pintan nada en los
    // otros dos, y meterlas en index.html les cobraría la descarga a todos.
    this.injectProfileFonts();

    // Numeración e inicial de cada empresa para el timeline
    this.jobs = this.profile.experience.jobs.map((job, i) => ({
      ...job,
      num: String(i + 1).padStart(2, '0'),
      initial: job.company.charAt(0)
    }));

    this.updateClock();
    this.clockTimer = setInterval(() => this.updateClock(), 30000);
  }

  ngOnDestroy(): void {
    if (this.clockTimer) clearInterval(this.clockTimer);
    if (this.profile.themeClass) {
      document.body.classList.remove(this.profile.themeClass);
    }
  }

  /** Añade el <link> de fuentes del perfil, si lo declara y no está ya puesto. */
  private injectProfileFonts(): void {
    const href = this.profile.fontsHref;
    if (!href || document.head.querySelector(`link[href="${href}"]`)) return;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
    // No se retira en ngOnDestroy a propósito: si el visitante vuelve a este
    // perfil, la hoja ya está y no hay un segundo parpadeo de fuente.
  }

  /** "Santiago" y "Chile" salen de contact.location ("Santiago, Chile"). */
  get city(): string {
    return this.profile.contact.location.split(',')[0].trim();
  }

  get country(): string {
    return (this.profile.contact.location.split(',')[1] ?? '').trim();
  }

  /** Contador de dos dígitos para el encabezado de cada tarjeta del stack. */
  pad(n: number): string {
    return String(n).padStart(2, '0');
  }

  private updateClock(): void {
    const now = new Date();
    const time = new Intl.DateTimeFormat('es-CL', {
      timeZone: 'America/Santiago', hour: '2-digit', minute: '2-digit', hour12: false
    }).format(now);
    let offset = '';
    try {
      const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Santiago', timeZoneName: 'shortOffset'
      }).formatToParts(now);
      offset = parts.find(p => p.type === 'timeZoneName')?.value ?? '';
    } catch {
      offset = '';
    }
    this.localTime = offset ? `${time} · ${offset}` : time;
  }

  get soundEnabled(): boolean {
    return this.audioService.enabled;
  }

  toggleSound(): void {
    this.audioService.toggle();
    if (this.audioService.enabled) {
      this.audioService.play('click');
    }
  }

  openMenu(): void {
    this.menuOpen = true;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  selectJob(job: Job): void {
    this.selectedJob = job;
    this.audioService.play('modal');
  }

  closeModal(): void {
    this.selectedJob = null;
  }

  playHover(): void {
    this.audioService.play('hover');
  }

  playClick(): void {
    this.audioService.play('click');
  }

  /** Suena el clic y baja a la sección. El routerLink solo deja el href correcto. */
  goTo(fragment: string): void {
    this.audioService.play('click');
    this.scroller.scrollToFragment(fragment);
  }
}
