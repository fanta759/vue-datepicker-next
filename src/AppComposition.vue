<script setup lang="ts">
import { reactive, ref } from 'vue';
import DatePicker from 'vue-datepicker-next';
import Calendar from '../lib/calendar/Calendar'
import { format, parse } from 'date-format-parse';

const inputProps = reactive({
        clearable: false,
        editable: false,
        placeholder: 'test placeholder',
        inputAttr: {
          name: 'test',
          id: 'test',
        },
      });

const shortcuts = ref([
        {
          text: 'range',
          onClick() {
            return [new Date(), new Date()];
          },
        },
      ]);
const value = reactive({
  date: new Date(2019, 9, 4, 8, 30, 0),
  });
const append = ref(false);
const rangeValue = ref([new Date(2019, 9, 4, 8, 30, 0), new Date(2019, 9, 4, 18, 30, 0)]);
const formatter = reactive ({
        stringify(date: Date) {
          return format(date, 'DD/MMM/YYYY');
        },
        parse(value: string) {
          return parse(value, 'DD/MMM/YYYY');
        },
        getWeek(date: Date) {
          return date.getDate();
        },
      });

function handleChange() {
  console.log('change');
}
function handleUpdate(val: Date) {
  this.value = val;
}

function updateValue(val){
  console.log(`AFA Update value val : ${val}`);
  console.log(`AFA Before update value : ${this.value.date}`);
  this.value.date = val;
  console.log(`AFA After update value : ${this.value.date}`);
}
</script>

<template>
  <div>
    <button @click="append = !append">ass</button>
    <DatePicker
      :value="value.date"
      :onUpdate:value="updateValue"
      type="date"
      placeholder="Selectionner une date"
      format="DD/MM/YYYY"
      :clearable="inputProps.clearable"
    ></DatePicker>
    <DatePicker
      v-model:value="rangeValue"
      :append-to-body="false"
      range
      :shortcuts="shortcuts"
      :editable="false"
    ></DatePicker>

    <calendar/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* color: #2c3e50; */
  margin-top: 60px;
  margin-left: 60px;
}
</style>
