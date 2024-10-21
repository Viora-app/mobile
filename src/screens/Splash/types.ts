type RouteParams = string | {name: string; params?: Record<string, unknown>};

export interface NavigationProps {
  navigation: {
    navigate: (routeParams: RouteParams) => {};
  };
}
