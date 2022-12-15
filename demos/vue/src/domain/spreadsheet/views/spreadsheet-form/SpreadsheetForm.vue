<template>
  <div class="SpreadsheetForm">
    <div class="SpreadsheetForm-spreadsheet" ref="spreadsheet" id="spreadsheetDemo"></div>
    <draggable-resizable class="SpreadsheetForm-draggable" :resizable="false"
      >holyshiiiiit</draggable-resizable
    >
  </div>
</template>

<script lang="ts">
import { Component, Ref } from 'vue-property-decorator';
import DraggableResizable from 'vue-draggable-resizable';

import { ObjectViewStructuralWidget } from '@/components/widget/headless';

import { getComponents } from '../../context';
import { initSpreadsheet } from './helper';

@Component({
  components: getComponents({ DraggableResizable }),
})
export default class SpreadsheetForm extends ObjectViewStructuralWidget {
  @Ref()
  private readonly spreadsheet!: HTMLDivElement;

  private mounted(): void {
    initSpreadsheet(this.spreadsheet);
  }
}
</script>

<style lang="scss" src="./style.scss" scoped></style>
