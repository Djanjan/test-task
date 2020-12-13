import { computed } from 'vue'

export function selectInput(props: { [x: string]: any }, emit: (arg0: string, arg1: any) => void, name = 'modelValue') { 
  return computed({ 
    get: () => props[name], 
    set: (value) => emit(`update:${name}`, value) 
  })
}