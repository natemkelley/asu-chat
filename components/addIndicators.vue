<template>
  <div style="margin-top:16px">
    <div class="col s12">
      <div class="chips chips-placeholder"></div>
      <p>Hit enter when you are done typing an indicator. Click indicator to set its default state to true.</p>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

export default {
  props: ["org"],
  data() {
    return {
      chips: true,
      stockIndicators: {}
    };
  },
  methods: {
    async emitChange() {
      let elemCont = this.$el.querySelectorAll(".chips")[0];
      let allChips = this.$el.querySelectorAll(".chip");
      let data = M.Chips.getInstance(elemCont);
      let chipSet = data.chipsData;
      var returnArray = [];

      chipSet.forEach((element, n) => {
        let uuid = uuidv4();
        let binary = allChips[n].classList.contains("green") ? true : false;
        let template = {
          uuid: uuid,
          name: element.tag,
          binary: binary
        };
        returnArray.push(template);
        this.updateStockArray(element.tag);
      });

      this.$emit("updateIndicators", returnArray);
      await this.getStockIndicators();
    },
    selectChip(chipCont, chip) {
      if (chip.classList.contains("green")) {
        chip.classList.remove("green");
      } else {
        chip.classList.add("green");
      }

      this.emitChange();
    },
    async initChips() {
      await this.getStockIndicators();
      let options = {
        placeholder: "Enter an indicator",
        secondaryPlaceholder: "+",
        onChipAdd: this.emitChange,
        onChipDelete: this.emitChange,
        onChipSelect: this.selectChip,
        autocompleteOptions: {
          data: this.stockIndicators,
          limit: Infinity,
          minLength: 1
        }
      };
      let elems = this.$el.querySelectorAll(".chips");
      M.Chips.init(elems, options);
      this.emitChange();
    },
    updateStockArray(name) {
      if (!this.org) {
        console.log("no org");
        return;
      }
      if (this.stockIndicators.hasOwnProperty(name)) {
        console.log("duplicate key");
        return;
      }

      let template = {
        org: this.org.toLowerCase(),
        name: name
      };

      this.$fireStore.collection("indicators").add(template);
    },
    getStockIndicators() {
      return new Promise((resolve, reject) => {
        if (!this.org) {
          resolve();
        }
        this.$fireStore
          .collection("indicators")
          .where("org", "==", this.org.toLowerCase())
          .get()
          .then(data => {
            this.stockIndicators = [];
            let tempJSON = {};
            data.docs.forEach(el => {
              tempJSON[el.data().name] = null;
            });
            this.stockIndicators = tempJSON;
            resolve();
          });
      });
    }
  },
  watch: {
    org() {
      this.initChips();
    }
  },
  mounted() {
    this.initChips();
    console.log(this)
  },
};
</script>

<style scoped lang="scss">
.row.toggle {
  margin-bottom: 5px;
}
.toggle p {
  margin-top: 0;
}

.chips.input-field {
  margin-top: 0;
}

.chips {
  margin-bottom: 20px;
}
</style>

<style>
.chips .input{
    width: 160px!important;
}
</style>