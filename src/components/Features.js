export default {
  props: {
    features: Array,
  },
  template: `<div class="features">
<h3>Features</h3>
<ul>
  <li v-for="feature in features">{{ feature }}</li>
</ul>
</div>`,
};
