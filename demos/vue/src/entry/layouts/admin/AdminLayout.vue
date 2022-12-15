<template>
  <app-container class="AdminLayout">
    <layout-container>
      <layout-aside class="AdminLayout-sidebar" width="208px">
        <router-link class="AdminLayout-brand" :to="{ name: 'root' }">Handie for Vue</router-link>
        <ul class="AdminLayout-menu">
          <li
            :class="{ 'is-active': nav.name === currentSubNav }"
            :key="nav.name"
            v-for="nav in subNavs"
          >
            <router-link :to="{ name: nav.name }">{{ nav.text }}</router-link>
          </li>
        </ul>
      </layout-aside>
      <layout-container>
        <layout-header height="48px">
          <nav class="AdminLayout-mainNav">
            <ul class="MainNav">
              <li
                class="MainNav-item"
                :class="{ 'is-active': nav.name === currentMainNav }"
                :key="nav.name"
                v-for="nav in availableNavs"
              >
                <router-link :to="{ name: nav.name }">{{ nav.text }}</router-link>
              </li>
            </ul>
          </nav>
        </layout-header>
        <layout-main class="AdminLayout-main" v-if="routeAccessible">
          <router-view v-if="accessible" />
          <div v-else>无权访问</div>
        </layout-main>
      </layout-container>
    </layout-container>
  </app-container>
</template>

<script lang="ts">
import { Vue, Component, Inject } from 'vue-property-decorator';

import { RouteConfig } from '@/types';
import {
  App as AppContainer,
  LayoutContainer,
  LayoutHeader,
  LayoutMain,
  LayoutAside,
} from '@/components/control';

import { NavMenu } from './typing';
import { resolveAvailableNavs, canAccessCurrentRoute } from './helper';

@Component({
  components: {
    AppContainer,
    LayoutContainer,
    LayoutHeader,
    LayoutMain,
    LayoutAside,
  },
})
export default class AdminLayout extends Vue {
  @Inject('routes')
  private readonly routes!: RouteConfig[];

  private availableNavs: NavMenu[] = [];

  private get currentMainNav() {
    return this.$route.matched[0].name;
  }

  private get currentSubNav() {
    return this.$route.matched[1].name!;
  }

  private get subNavs() {
    const { matched } = this.$route;
    const mainNav = this.availableNavs.find(nav => nav.name === matched[0].name);

    return (mainNav && mainNav.children) || [];
  }

  private get routeAccessible() {
    return this.$store.state.session.authority.accessible;
  }

  private get accessible() {
    return canAccessCurrentRoute(this.$route.matched, this.routeAccessible);
  }

  private created(): void {
    this.$store.dispatch('session/fetchCurrentUser', {
      success: accessible => (this.availableNavs = resolveAvailableNavs(this.routes, accessible)),
    });
  }
}
</script>

<style lang="scss" src="./style.scss" scoped></style>
