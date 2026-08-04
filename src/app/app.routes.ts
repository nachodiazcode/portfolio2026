import { Routes } from '@angular/router';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { CvFullstackComponent } from './pages/cv-fullstack/cv-fullstack.component';
import { FRONTEND_PROFILE } from './data/profiles/frontend.profile';
import { FULLSTACK_PROFILE } from './data/profiles/fullstack.profile';

/**
 * Una sola plantilla, dos portafolios:
 *   /            → Frontend & UX (paleta magenta/violeta)
 *   /fullstack   → Full-Stack     (paleta verde Node)
 *   /cv-fullstack→ CV imprimible en A4
 */
export const routes: Routes = [
  { path: '', component: PortfolioComponent, data: { profile: FRONTEND_PROFILE } },
  { path: 'fullstack', component: PortfolioComponent, data: { profile: FULLSTACK_PROFILE } },
  { path: 'cv-fullstack', component: CvFullstackComponent },
  { path: '**', redirectTo: '' }
];
