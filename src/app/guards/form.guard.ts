import { CanDeactivateFn } from '@angular/router';

export const formGuard: CanDeactivateFn<unknown> = () => {
  if (confirm('Are you sure')) {
    localStorage.removeItem('token');
    return true;
  } else return false;
};
