<template>
  <div>
    <div class="push-top-small container pastRooms">
      <div class="loader" v-show="loading">
        <RotateSquare2 />
      </div>

      <div class="row" v-show="!loading">
        <h1 class="red-text">
          THIS NO LONGER WORKS SINCE IT IS NOT A CHATROOM.
        </h1>
        <div class="selector download right">
          <a
            @click="clickDownload"
            class="green darken-2 waves-effect waves-light btn"
            ><i class="material-icons right">save</i>{{ selected }} ({{
              countSelection
            }})</a
          >
        </div>
        <div class="selector bulk right">
          <select class="browser-default" v-model="selected">
            <option disabled value="">Please select one</option>
            <option>Download Individually</option>
            <option>Download Aggregated</option>
          </select>
        </div>
      </div>

      <div class="chart" v-show="!loading">
        <vue-good-table
          @on-selected-rows-change="selectionChanged"
          :columns="columns"
          :rows="rooms"
          :select-options="{
            enabled: true,
            selectOnCheckboxOnly: true,
          }"
          :search-options="{ enabled: true }"
          :sort-options="{
            enabled: true,
            initialSortBy: { field: 'time.seconds', type: 'desc' },
          }"
        >
          <template slot="table-row" slot-scope="props">
            <span
              v-if="props.column.field == 'delete'"
              @click="deleteStudy(props)"
              class="clickable red-text"
            >
              Delete
            </span>
          </template>
        </vue-good-table>
      </div>

      <!-- Modal Structure -->
      <div id="modal1" class="modal">
        <div class="modal-content">
          <h4>Delete Data Set</h4>
          <div class="row">
            <div class="col s5">
              <p>The following data set is about to be deleted:</p>
            </div>
            <div class="col s7">
              <p><strong>Room Name:</strong> {{ deleteRowData.roomName }}</p>
              <p><strong>Organization:</strong> {{ deleteRowData.org }}</p>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Count</th>
                <th>Sender</th>
                <th>Message</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(message, n) in deleteMessages" :key="n">
                <td>{{ message.timestamp | moment }}</td>
                <td>{{ message.chatNumber }}</td>
                <td>{{ message.sender }}</td>
                <td>{{ message.message }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="modal-footer">
          <a
            @click="removeStudyFromDatabase"
            class="waves-effect waves-light red btn-small"
            ><i class="material-icons right">delete_forever</i>Delete</a
          >
        </div>
      </div>

      <SaveData
        :selectionData="selectionData"
        :selected="selected"
        :startExport="startExport"
      />
    </div>
  </div>
</template>

<script>
import { VueGoodTable } from "vue-good-table";
import "@/node_modules/vue-good-table/dist/vue-good-table.css";
import data from "@/assets/testData.json";
import { RotateSquare2 } from "@/node_modules/vue-loading-spinner";
import moment from "moment";
import SaveData from "@/components/saveDataSetsModal";

export default {
  data() {
    return {
      columns: [
        {
          label: "Room Name",
          field: "roomName",
        },
        {
          label: "Organization",
          field: "org",
        },
        {
          label: "Created On",
          field: "time.seconds",
          type: "date",
          dateInputFormat: "t",
          dateOutputFormat: "MMMM d, yyyy",
        },
        {
          label: "# of Chats",
          field: "numberOfChat",
          type: "number",
        },
        {
          label: "Active Status",
          field: "active",
          type: "boolean",
        },
        {
          label: "Delete",
          field: "delete",
        },
      ],
      rooms: [],
      selectionData: [],
      download: true,
      loading: true,
      deleteRowData: {},
      countSelection: 0,
      selected: "Download Individually",
      deleteMessages: [],
      startExport: 0,
    };
  },
  components: {
    VueGoodTable,
    RotateSquare2,
    SaveData,
  },
  methods: {
    //https://xaksis.github.io/vue-good-table/guide/advanced/checkbox-table.html#configuration
    selectionChanged(data) {
      //console.log(data.selectedRows);
      this.selectionData = data.selectedRows;
      this.countSelection = data.selectedRows.length;
    },
    deleteStudy(data) {
      this.deleteRowData = data.row;
      //console.log(data);
      var elems = this.$el.querySelectorAll(".modal");
      M.Modal.getInstance(elems[0]).open();

      this.deleteMessages = [];
      this.$fireStore
        .collection("rooms")
        .doc(this.deleteRowData.uuid)
        .collection("chats")
        .orderBy("chatNumber")
        .get()
        .then((data) => {
          data.docs.forEach((doc) => {
            this.deleteMessages.push(doc.data());
          });
          //console.log(this.deleteMessages);
        });
    },
    removeStudyFromDatabase() {
      //console.log(this.deleteRowData.uuid);

      var r = confirm("Are you really sure you want to delete this dataset?");
      if (r == true) {
        this.$fireStore
          .collection("rooms")
          .doc(this.deleteRowData.uuid)
          .delete()
          .then(function() {
            var elems = document.querySelectorAll(".modal");
            M.Modal.getInstance(elems[0]).close();
          });
      }
    },
    clickDownload() {
      this.startExport = this.startExport + 1;
    },
  },
  mounted() {
    this.$fireStore.collection("rooms").onSnapshot((data) => {
      setTimeout(() => {
        this.rooms = [];
        data.docs.forEach((doc) => {
          this.rooms.push(doc.data());
        });
        //console.log(this.rooms);
        this.loading = false;
      }, 300);
    });

    var elems = document.querySelectorAll(".modal");
    M.Modal.init(elems);
  },
  filters: {
    moment: function(date) {
      //console.log(date);
      //return true
      return moment(date).format("llll");
    },
  },
};
</script>

<style scoped>
.pastRooms {
  width: 100%;
  max-width: 1000px;
}

.bulk {
  width: 200px;
}

.selector {
  margin-left: 15px;
}
.selector .btn {
  margin-top: 3px;
}

.loader {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  margin-top: 30px;
}
</style>

<style>
.chart {
  padding-bottom: 50px;
}

.chart .vgt-global-search__input input {
  background-color: white;
  border: none;
  border-bottom: none;
  border-radius: 2px;
  outline: none;
  height: 2rem;
  width: 100%;
  font-size: 16px;
  margin: 0px;
  padding: 10px;
  box-shadow: none;
  box-sizing: inherit;
}

.chart input {
  position: inherit !important;
  opacity: 1 !important;
  pointer-events: visible !important;
}

td:last-child {
  text-align: center;
}

.modal td:last-child {
  text-align: left;
}
</style>
