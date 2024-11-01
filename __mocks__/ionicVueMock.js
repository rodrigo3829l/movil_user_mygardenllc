jest.mock("@ionic/vue", () => ({
  IonTabs: { template: "<div><slot /></div>" },
  IonRouterOutlet: { template: "<div><slot /></div>" },
  IonTabBar: { template: "<div><slot /></div>" },
  IonTabButton: { template: "<button><slot /></button>" },
  IonIcon: { template: "<i></i>" },
  IonLabel: { template: "<span><slot /></span>" },
}));
