/*
 * @Author: JSJ 389114820@qq.com
 * @Date: 2024-05-11 17:27:02
 * @Description: 
 */
import type { FormInst } from 'naive-ui'
import { ValidationTrigger } from 'naive-ui/es/form/src/interface'

export function useFormRules() {

  /** the default required rule */
  const defaultRequiredRule = createRequiredRule('不能为空')

  function createRequiredRule(message: string, trigger?: ValidationTrigger | string | Array<ValidationTrigger | string>): App.Global.FormRule {
    return {
      required: true,
      message,
      trigger: trigger || 'blur'
    }
  }

  function createCustomRule(customRule: App.Global.FormRule | App.Global.FormRule[]): App.Global.FormRule | App.Global.FormRule[] {
    return customRule
  }

  return {
    defaultRequiredRule,
    createRequiredRule,
    createCustomRule
  }
}

export function useNaiveForm() {
  const formRef = ref<FormInst | null>(null)

  async function validate() {
    await formRef.value?.validate()
  }

  async function restoreValidation() {
    formRef.value?.restoreValidation()
  }

  return {
    formRef,
    validate,
    restoreValidation
  }
}
