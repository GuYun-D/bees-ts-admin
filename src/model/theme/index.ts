interface IVariables {
  menuText: string
  menuActiveText: string
  subMenuActiveText: string
  menuBg: string
  menuHover: string
  subMenuBg: string
  subMenuHover: string
  sideBarWidth: string
}

export interface IThemeStore {
  mainColor: string
  variables: IVariables
}
