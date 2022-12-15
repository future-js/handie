import { ActionHandler } from 'vuex';
import { UserAuthority } from 'handie-vue';

import { isArray, noop } from '@/utils';

import { UserInfo, UserPermission, UserAndPermissions } from './typing';
import context from './context';

type AllUserAuthority = Record<'accessible' | 'operable', UserAuthority>;

type SessionState = {
  user: UserInfo | null;
  authority: AllUserAuthority;
};

type SessionMutations<S> = {
  updateCurrentUser: (state: S, payload: UserInfo) => void;
  updateAuthority: (state: S, payload: AllUserAuthority) => void;
};

type SessionActions<S> = {
  fetchCurrentUser: ActionHandler<S, any>;
};

const state: () => SessionState = () => ({
  user: null,
  authority: {
    accessible: null,
    operable: null,
  },
});

const mutations: SessionMutations<SessionState> = {
  updateCurrentUser: (state, payload) => (state.user = payload),
  updateAuthority: (state, payload) => (state.authority = payload),
};

function getAccessibleAuthority(
  permissions: Record<string, UserPermission> | UserPermission,
): Record<string, boolean> {
  let accessible: Record<string, boolean> = {};

  if (isArray(permissions)) {
    (permissions as string[]).forEach(permission => (accessible[permission] = true));
  } else {
    Object.keys(permissions).forEach(key => {
      accessible = { ...accessible, [key]: true, ...getAccessibleAuthority(permissions[key]) };
    });
  }

  return accessible;
}

const actions: SessionActions<SessionState> = {
  fetchCurrentUser: async ({ commit }, payload = {}) => {
    const { success = noop, fail = noop } = payload;

    context
      .execute(
        'getCurrentUser',
        (data: UserAndPermissions) => {
          const { permissions, ...others } = data;
          const accessible = getAccessibleAuthority(permissions);

          commit('updateCurrentUser', others);
          commit('updateAuthority', { accessible, operable: null });

          success(accessible);
        },
        fail,
      )
      .catch(fail);
  },
};

export default { state, mutations, actions };
