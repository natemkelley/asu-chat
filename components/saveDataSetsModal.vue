<template>
  <div>
    <div id="modalExport" class="modal">
      <div class="modal-content">
        <h4>Download Progress</h4>
        <div class="progress light-blue lighten-4">
          <div class="determinate blue" :style="{ width: width + '%' }"></div>
        </div>
        <div class="row progress-text right">{{ width }}%</div>
      </div>
      <!--<div class="modal-footer">
        <a href="#!" class="modal-close waves-effect waves-green btn-flat"
          >Agree</a
        >
      </div>-->
    </div>
  </div>
</template>

<script>
//import csvDownload from "json-to-csv-export";
import { saveAs } from "file-saver";
const { Parser } = require("json2csv");
import moment from "moment";

export default {
  props: ["selectionData", "selected", "startExport"],
  data() {
    return {
      width: 10
    };
  },
  watch: {
    startExport(newVal) {
      var elems = this.$el.querySelectorAll(".modal");
      M.Modal.init(elems, { dismissible: true });

      if (this.selectionData.length == 0) {
        M.toast({ html: "Please select something", classes: "red rounded" });
        return;
      }

      var elems = this.$el.querySelectorAll(".modal");
      M.Modal.getInstance(elems[0]).open();

      if (this.selected == "Download Individually") {
        this.downloadIndividually(this.selectionData);
      } else {
        this.aggregateData(this.selectionData);
      }
    }
  },
  methods: {
    async downloadIndividually(selectedData) {
      var lengthOfArray = selectedData.length;
      var pos = 0;
      var allTheData = [];
      this.width = 0;

      for (const dataSet of selectedData) {
        allTheData = [];
        pos++;
        this.width = Number(((pos / lengthOfArray) * 100).toFixed(2));
        let data = await this.$fireStore
          .collection("rooms")
          .doc(dataSet.uuid)
          .collection("chats")
          .orderBy("chatNumber")
          .get();

        data.docs.forEach(doc => {
          allTheData.push(doc.data());
        });

        allTheData = await this.addExtraColumns(allTheData);

        let exportName = allTheData[0].roomName+ ".csv";
        this.downloadCSV(allTheData, exportName);
      }

      this.closeModal();
    },
    async aggregateData(selectedData) {
      var lengthOfArray = selectedData.length;
      var pos = 0;
      var allTheData = [];
      this.width = 0;

      for (const dataSet of selectedData) {
        pos++;
        this.width = Number(((pos / lengthOfArray) * 100).toFixed(2));
        let data = await this.$fireStore
          .collection("rooms")
          .doc(dataSet.uuid)
          .collection("chats")
          .orderBy("chatNumber")
          .get();

        data.docs.forEach(doc => {
          allTheData.push(doc.data());
        });
      }

      allTheData = await this.addExtraColumns(allTheData);

      let exportName = moment().format("LLLL") + " Export" + ".csv";
      this.downloadCSV(allTheData, exportName);
      this.closeModal();
    },
    closeModal() {
      var elems = this.$el.querySelectorAll(".modal");
      M.Modal.getInstance(elems[0]).close();
    },
    addExtraColumns(data) {
      return new Promise((resolve, reject) => {
        data.forEach(obj => {
          const timestampFormatted = moment(obj.timestamp).format(
            "M/D/YYYY HH:mm:ss"
          ); //3/21/2020  3:38:00
          obj.timestampFormatted = timestampFormatted;

        });
        resolve(data);
      });
    },
    downloadCSV(data, name) {
      const fields = [
        {
          label: "Formatted Timestamp",
          value: "timestampFormatted"
        },
        { label: "Chat Number", value: "chatNumber" },
        {
          label: "Sender",
          value: "sender"
        },
        {
          label: "Message",
          value: "message"
        },
        {
          label: "Chat Room Name",
          value: "roomName"
        },
                {
          label: "Unix Timestamp",
          value: "timestamp"
        }
      ];
      const json2csvParser = new Parser({ fields });
      const csv = json2csvParser.parse(data);
      var file = new File([csv], name, {
        type: "text/plain;charset=utf-8"
      });
      saveAs(file);

      M.toast({
        html: "Downloaded Dataset",
        classes: "green darken-2 rounded"
      });
    }
  }
};
</script>

<style scoped lang="scss">
.progress {
  margin-top: 55px;
  height: 15px;
  border-radius: 20px;
  transition: 450ms all;
}

.progress-text {
  font-size: 24px;
}
</style>
