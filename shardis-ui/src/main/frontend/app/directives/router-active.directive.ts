import {Router} from '@angular/router';
import {isPresent} from '@angular/core/src/facade/lang';
import {Directive, Query, QueryList, Attribute, ElementRef, Renderer, Optional, Input} from '@angular/core';
import {RouterLink} from '@angular/router/src/directives/router_link';

/**
 * RouterActive dynamically finds the first element with routerLink and toggles the active class
 *
 * ## Use
 *
 * ```
 * <li router-active="active"><a [routerLink]=" ['/Home'] ">Home</a></li>
 * <li [routerActive]=" activeStringValue "><a [routerLink]=" ['/Home'] ">Home</a></li>
 * ```
 */
@Directive({
  selector: '[router-active], [routerActive]'
})
export class RouterActive {
  @Input() routerActive:string = null;
  routerActiveAttr:string = 'active';

  constructor(public router:Router,
              public element:ElementRef,
              public renderer:Renderer,
              @Query(RouterLink as any) public routerLink:QueryList<RouterLink>,
              @Optional() @Attribute('router-active') routerActiveAttr?:string) {
    this.routerActiveAttr = this._defaultAttrValue(routerActiveAttr);
  }

  ngOnInit() {
    this.router.changes.subscribe(() => {
      if (this.routerLink.first) {
        this._updateClass();
      }
    });
  }

  private _updateClass() {
    let active = this.routerLink.first.isActive;
    this.renderer.setElementClass(this.element.nativeElement, this._attrOrProp(), active);
  }

  private _defaultAttrValue(attr?:string) {
    return this.routerActiveAttr = attr || this.routerActiveAttr;
  }

  private _attrOrProp() {
    return isPresent(this.routerActive) ? this.routerActive : this.routerActiveAttr;
  }
}
