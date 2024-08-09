import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
  RouteReuseStrategy,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CustomRoute implements RouteReuseStrategy {
  routesToCache: string[] = ['user', 'user/:id'];
  storedRouteHandles = new Map<string, DetachedRouteHandle>();

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return this.routesToCache.indexOf(this.getPath(route)) > -1;
  }
  getPath(route: ActivatedRouteSnapshot): any {
    let path = '';
    if (route.routeConfig != null && route.routeConfig.path != null)
      path = route.routeConfig.path;
    return path;
  }
  store(
    route: ActivatedRouteSnapshot,
    handle: DetachedRouteHandle | null
  ): void {
    this.storedRouteHandles.set(this.getPath(route), handle!);
  }
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return this.storedRouteHandles.has(this.getPath(route));
  }
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    return this.storedRouteHandles.get(
      this.getPath(route)
    ) as DetachedRouteHandle;
  }
  shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    curr: ActivatedRouteSnapshot
  ): boolean {
    if (future.component && (<any>future.component).name == 'ShowComponent') {
      return false;
    }
    return future.routeConfig === curr.routeConfig;
  }
}
