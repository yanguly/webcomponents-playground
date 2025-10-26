import { bootstrapApplication } from '@angular/platform-browser';
import '@material/web/menu/menu-item.js';
import '@material/web/menu/menu.js';
import '@material/web/textfield/filled-text-field.js';
import { styles as typescaleStyles } from '@material/web/typography/md-typescale-styles.js';
import { appConfig } from './app/app.config';
import { App } from './app/app';

const adoptMaterialTypography = () => {
  if (typeof document === 'undefined') {
    return;
  }
  const typescaleSheet = typescaleStyles.styleSheet;
  if (typescaleSheet && 'adoptedStyleSheets' in document) {
    const docWithSheets = document as Document & { adoptedStyleSheets: CSSStyleSheet[] };
    docWithSheets.adoptedStyleSheets = [...docWithSheets.adoptedStyleSheets, typescaleSheet];
    return;
  }
  const fallbackStyle = document.createElement('style');
  fallbackStyle.textContent = typescaleStyles.cssText;
  document.head.appendChild(fallbackStyle);
};

adoptMaterialTypography();
bootstrapApplication(App, appConfig).catch((err) => console.error(err));
