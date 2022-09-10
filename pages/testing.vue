<script setup>
import { Form, Field } from "vee-validate";
import questions from "@/data/checklist";

function logvalues(values) {
  console.log(values);
}
</script>

<template>
  <view-wrapper title="Checklist">
    <Form @submit="logvalues" class="space-y-8 divide-y divide-gray-200">
      <div v-for="question in questions">
        <div v-for="subquestion in question">
          <fieldset>
            <legend class="text-base font-medium text-gray-900">
              {{ subquestion.header }}
            </legend>
            <div
              v-for="(data, index) in subquestion.data"
              class="mt-4 space-y-4"
            >
              <div class="relative flex items-start">
                <div class="flex items-center h-5">
                  <Field
                    id="comments"
                    :value="true"
                    :name="`${subquestion.header}-${index}`"
                    type="checkbox"
                    class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label for="comments" class="font-medium text-gray-700">{{
                    data
                  }}</label>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
      <div class="pt-5">
        <div class="flex justify-end">
          <button
            type="button"
            class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </div>
    </Form>
  </view-wrapper>
</template>

<!-- <template>
  <view-wrapper title="Add new Form">
    <Form @submit="logvalues">
      <label :for="test"> testing </label>
      <Field name="test" as="input">asdasd</Field>
      <button type="submit">asdasdasd</button>
    </Form>
  </view-wrapper>
</template> -->
