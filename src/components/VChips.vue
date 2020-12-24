<template>
  <div :class="getClassProps" :style="getStyleProps">
    <div>
      <i
        v-if="icon !== ''"
        class="material-icons md-36"
        :style="{ color: outline ? color : 'var(--color-contrast-lower)' }"
        >{{ icon }}</i
      >
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'VChips',
  props: {
    outline: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: 'var(--color-primary)',
    },
    icon: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const getClassProps = computed(() => {
      let classOut = 'v-chips ';
      if (props.outline) {
        classOut += 'v-chips--outline ';
      }
      return classOut;
    });

    const getStyleProps = computed(() => {
      const styleOut = {};
      if (props.color !== '' && !props.outline) {
        styleOut['background-color'] = props.color;
        styleOut.color = 'var(--color-contrast-lower)';
      } else if (props.color !== '' && props.outline) {
        styleOut.border = `1px solid ${props.color}`;
        styleOut.color = props.color;
      }
      return styleOut;
    });

    return {
      getClassProps,
      getStyleProps,
    };
  },
});
</script>

<style scoped>
.v-chips {
  border-radius: 200px 200px 200px 200px;
  background-color: var(--color-primary);
  position: relative;
  min-width: 3em;
  margin: 0.2em;
  display: flex;
  text-align: center;
  justify-content: space-around;
  align-items: center;
}

.v-chips.v-chips--outline {
  border: thin solid;
  box-shadow: none;
  background-color: transparent;
}

.v-chips > .material-icons {
  color: var(--color-primary);
  font-size: 24px;
  margin-left: 0.3em;
}

/*.v-chips > div {
  margin-left: 1em;
  margin-right: 1em;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}*/
</style>
