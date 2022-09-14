<script setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import { questions2 } from "@/data/checklist";

async function logvalues(values) {
  console.log(values);
  const { data } = await useFetch("/api/notion", {
    params: {
      name: values.name,
      checklist: "2",
    },
  });
  console.log(data.value);
  if (data.value) {
    return navigateTo("/records");
  } else {
    alert("Uh oh, something went wrong.");
  }
}

function validate(value) {
  return !!value ? !!value : "This needs to be ticked";
}

function validatename(value) {
  return value.length !== 0 ? true : "Name required";
}

function invalid() {
  alert(
    "To submit the form all fields must be clicked. Please look at all the Fields to ensure its all ticked"
  );
}
</script>

<template>
  <view-wrapper title="New Record">
    <Form
      @submit="logvalues"
      @invalid-submit="invalid"
      class="space-y-8 divide-y divide-gray-200"
    >
      <div>
        <label class="block text-sm font-medium text-gray-700"
          >Approving Officer</label
        >
        <div class="mt-1">
          <Field
            :rules="validatename"
            name="name"
            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />

          <ErrorMessage
            class="block mt-xs text-red-700 font-medium"
            name="name"
          >
          </ErrorMessage>
        </div>
      </div>
      <div v-for="question in questions2">
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
                    :value="true"
                    :rules="validate"
                    :name="`${subquestion.header}-${index}`"
                    type="checkbox"
                    class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label class="font-medium text-gray-700">{{ data }}</label>
                </div>
              </div>
              <ErrorMessage
                class="block mt-xs text-red-700 font-medium"
                :name="`${subquestion.header}-${index}`"
              >
              </ErrorMessage>
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
