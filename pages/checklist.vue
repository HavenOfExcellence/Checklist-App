<script setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import { questions2 } from "@/data/checklist";

function getRemarks(stuff) {
  let remarks = "";
  for (const [key, value] of Object.entries(stuff)) {
    console.log({ key, value });

    if (key == "name") {
      continue;
    }

    if (value == "true" || value == "false") {
      continue;
    }

    console.log({ key, value });
    remarks += `${key} : ${value}`;
  }

  return remarks;
}

async function logvalues(values) {
  const remarks = getRemarks(values);

  const { node } = values;

  const { data } = await useFetch("/api/sheets", {
    params: {
      name: values.name,
      checklist: "2",
      remarks,
      node,
    },
  });
  console.log(data.value);
  if (data.value) {
    return navigateTo("/records");
  } else {
    alert("Uh oh, something went wrong.");
  }
}

function isBool(value) {
  console.log(value);
  console.log(typeof value.value == "boolean");
  return typeof value.value == "boolean";
}

function validate(value) {
  return value == undefined ? "This needs to be ticked" : true;
}

function validatename(value) {
  return value == undefined ? "Name Required" : true;
}

function invalid() {
  alert(
    "To submit the form all fields must be clicked. Please look at all the Fields to ensure its all ticked"
  );
}
</script>

<template>
  <view-wrapper title="EOHO">
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
      <div>
        <label class="block text-sm font-medium text-gray-700">Node</label>
        <div class="mt-1">
          <Field as="select" id="node" name="node">
            <option value="HQ">HQ</option>
            <option value="ATC">ATC</option>
            <option value="LVC">LVC</option>
            <option value="STC">STC</option>
            <option value="CTN">CTN</option>
            <option value="TTN">TTN</option>
            <option value="CLN">CLN</option>
          </Field>

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
                <div class="flex flex-col">
                  <!-- <Field
                    :value="true"
                    :rules="validate"
                    :name="`${subquestion.header}-${index}`"
                    type="checkbox"
                    class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    /> -->

                  <div class="text-sm">
                    <label class="font-medium text-gray-700">{{ data }}</label>
                  </div>
                  <Field
                    v-slot="{ field }"
                    :name="`${subquestion.header}-${index}`"
                    :rules="validate"
                  >
                    <div class="flex flex-row gap-x-4">
                      <div>
                        <input
                          v-bind="field"
                          class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          :name="`${subquestion.header}-${index}`"
                          type="radio"
                          value="true"
                        />
                        Yes
                      </div>
                      <div>
                        <input
                          v-bind="field"
                          class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          :name="`${subquestion.header}-${index}`"
                          type="radio"
                          value="false"
                        />
                        No
                      </div>
                      <label for="email" class="sr-only">Remarks</label>
                      <!-- <div v-if="isBool(field)">
                        asd
                        <input
                          :disabled="true"
                          type="text"
                          :name="`${subquestion.header}-${index}`"
                          class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md"
                          placeholder="Remarks"
                        />
                      </div> -->
                      <div>
                        <input
                          :disabled="false"
                          v-bind="field"
                          type="text"
                          :name="`${subquestion.header}-${index}`"
                          class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md"
                          placeholder="Remarks"
                        />
                      </div>
                    </div>
                    <ErrorMessage
                      :name="`${subquestion.header}-${index}`"
                      class="block mt-xs text-red-700 font-medium"
                    />
                  </Field>
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
