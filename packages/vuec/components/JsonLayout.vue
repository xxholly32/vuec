<script type="text/jsx">
import transform from '../utils/transform';

export default {
  name: "json-layout",
  props: {
    value: {
      type: Object,
      default: ()=>{}
    }
  },
  data() {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    };
    return {
      tableData: Array(20).fill(item)
    }
  },
  render(h) {
    return transform.renderFunc(h, this.value.ast);
  }
};
</script>

<style></style>
