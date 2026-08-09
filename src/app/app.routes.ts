import { Routes } from '@angular/router';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { CvFullstackComponent } from './pages/cv-fullstack/cv-fullstack.component';
import { FRONTEND_PROFILE } from './data/profiles/frontend.profile';
import { FULLSTACK_PROFILE } from './data/profiles/fullstack.profile';
import { UXUI_PROFILE } from './data/profiles/uxui.profile';

/**
 * Una sola plantilla, tres portafolios:
 *   /            → Frontend & UX (paleta magenta/violeta)
 *   /fullstack   → Full-Stack     (paleta verde Node)
 *   /uxui        → UX/UI          (tema cuaderno: papel y trazo a mano)
 *   /cv-fullstack→ CV imprimible en A4
 */
export const routes: Routes = [
  { path: '', component: PortfolioComponent, data: { profile: FRONTEND_PROFILE } },
  { path: 'fullstack', component: PortfolioComponent, data: { profile: FULLSTACK_PROFILE } },
  { path: 'uxui', component: PortfolioComponent, data: { profile: UXUI_PROFILE } },
  { path: 'cv-fullstack', component: CvFullstackComponent },
  { path: '**', redirectTo: '' }
];
