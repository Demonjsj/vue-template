<script setup lang="ts">
import { zhCN, dateZhCN } from 'naive-ui'
import { useColorStore } from '@/stores/modules/color'

defineOptions({
  name: 'App'
})

const getThemeOverrides = computed(() => {
  const colorStore = useColorStore()
  const themeColor = colorStore.themeColor
  const themeTextColor = colorStore.themeTextColor
  const disabledColor = colorStore.disabledColor
  const themeTextColor60 = colorStore.themeTextColor60
  return {
    common: {
      primaryColor: themeColor,
      primaryColorHover: themeColor,
      primaryColorPressed: themeColor,
      infoColor: themeColor,
      infoColorHover: 'rgba(themeColor, 0.8))',
      infoColorPressed: themeColor,
      borderRadius: '4px',
      successColorHover: themeColor,
      textColor2: themeTextColor
    },
    Menu: {
      itemColorActive: themeColor,
      itemColorActiveHover: themeColor,
      itemColorActiveCollapsed: themeColor,
      itemTextColorActive: '#FFF',
      itemTextColorActiveHover: '#FFF',
      itemIconColorActive: '#FFF',
      itemIconColorActiveHover: '#FFF',
      itemHeight: '48px'
    },
    Button: {
      colorDisabledPrimary: disabledColor,
      borderDisabledPrimary: 'none',
      colorDisabled: disabledColor,
      textColorDisabled: '#FFF',
      iconMarginMedium: '4px',
      textColorText: themeColor
    },
    Input: {
      borderFocus: themeColor,
      boxShadowFocus: '0 0 6px 1px ' + themeColor,
      heightMedium: '34px',
      borderError: '1px solid #ff0000'
    },
    Dropdown: {
      optionSuffixWidthHuge: '28px',
      optionPrefixWidthHuge: '28px',
      optionColorHover: themeColor,
      optionTextColorHover: '#FFF'
    },
    Select: {
      peers: {
        InternalSelection: {
          // border: 'none',
          heightSmall: '32px',
          background: 'transparent'
        },
        InternalSelectMenu: {
          optionColorPending: themeColor,
          optionTextColorPressed: '#fff',
          optionTextColorHover: '#fff',
          optionTextColorActive: themeColor,
          actionTextColor: '#fff',
        }
      }
    },
    Tooltip: {
      color: '#FFF',
      textColor: themeTextColor
    },
    Badge: {
      color: themeColor
    },
    Form: {
      labelTextColor: themeTextColor60,
    },
    Tabs: {
      tabPaddingMediumLine: '12px 16px',
      tabGapMediumLine: '0px',
      panePaddingMedium: '10px 10px 0px 10px',
    },
    Card: {
      paddingMedium: '16px 18px'
    }
  }
})
</script>

<template>
  <NConfigProvider class="h-full" :theme-overrides="getThemeOverrides" :locale="zhCN" :date-locale="dateZhCN"
    inline-theme-disabled>
    <AppProvider>
      <RouterView class="bg-layout" />
    </AppProvider>
  </NConfigProvider>
</template>

<style scoped></style>
