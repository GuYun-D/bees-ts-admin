import type { DriveStep } from 'driver.js'
import type { useI18n } from 'vue-i18n'
export default (i18n: ReturnType<typeof useI18n>): DriveStep[] => {
  return [
    {
      element: '#guide-start',
      popover: {
        title: i18n.t('sys.guide.guideTitle'),
        description: i18n.t('sys.guide.guideDesc'),
        side: 'bottom'
      }
    },
    {
      element: '#guide-hamburger',
      popover: {
        title: i18n.t('sys.guide.hamburgerTitle'),
        description: i18n.t('sys.guide.hamburgerDesc'),
        side: 'bottom'
      }
    },
    {
      element: '#guide-breadcrumb',
      popover: {
        title: i18n.t('sys.guide.breadcrumbTitle'),
        description: i18n.t('sys.guide.breadcrumbDesc')
      }
    },
    {
      element: '#guide-search',
      popover: {
        title: i18n.t('sys.guide.searchTitle'),
        description: i18n.t('sys.guide.searchDesc'),
        side: 'bottom'
      }
    },
    {
      element: '#guide-full',
      popover: {
        title: i18n.t('sys.guide.fullTitle'),
        description: i18n.t('sys.guide.fullDesc'),
        side: 'bottom'
      }
    },
    {
      element: '#guide-theme',
      popover: {
        title: i18n.t('sys.guide.themeTitle'),
        description: i18n.t('sys.guide.themeDesc'),
        side: 'bottom'
      }
    },
    {
      element: '#guide-lang',
      popover: {
        title: i18n.t('sys.guide.langTitle'),
        description: i18n.t('sys.guide.langDesc'),
        side: 'bottom'
      }
    },
    {
      element: '#guide-tags',
      popover: {
        title: i18n.t('sys.guide.tagTitle'),
        description: i18n.t('sys.guide.tagDesc')
      }
    },
    {
      element: '#guide-sidebar',
      popover: {
        title: i18n.t('sys.guide.sidebarTitle'),
        description: i18n.t('sys.guide.sidebarDesc'),
        side: 'right'
      }
    }
  ]
}
