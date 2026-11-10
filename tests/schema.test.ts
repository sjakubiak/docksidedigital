import assert from "node:assert/strict";
import test from "node:test";
import {
  intakeEmailPayloadSchema,
  insertIntakeSubmissionSchema,
  insertOrderSchema,
  orderFormSchema,
} from "../shared/schema";

const order = {
  name: "Test Customer",
  email: "customer@example.com",
  projectType: "website",
  carePlan: "standard",
};

test("order validation accepts every supported project and care plan", () => {
  for (const projectType of ["landing", "website", "mvp"]) {
    for (const carePlan of ["none", "basic", "standard", "pro"]) {
      assert.equal(
        orderFormSchema.safeParse({ ...order, projectType, carePlan }).success,
        true,
      );
    }
  }
});

test("order validation preserves custom enum messages after the Zod upgrade", () => {
  for (const [field, message] of [
    ["projectType", "Please select a valid project type"],
    ["carePlan", "Please select a valid care plan"],
  ]) {
    const result = orderFormSchema.safeParse({ ...order, [field]: "invalid" });
    assert.equal(result.success, false);
    if (!result.success) {
      assert.equal(result.error.issues[0].path[0], field);
      assert.equal(result.error.issues[0].message, message);
    }
  }
});

test("invalid orders return structured validation issues", () => {
  for (const payload of [{}, { ...order, email: "invalid" }, null]) {
    const result = orderFormSchema.safeParse(payload);
    assert.equal(result.success, false);
    if (!result.success) assert.ok(result.error.issues.length > 0);
  }
});

test("intake validation accepts an optional event UUID and rejects malformed input", () => {
  const payload = {
    formData: {
      businessName: "Test Business",
      contactName: "Test Customer",
      email: "customer@example.com",
    },
    summary: "Website enquiry",
  };
  assert.equal(intakeEmailPayloadSchema.safeParse(payload).success, true);
  assert.equal(
    intakeEmailPayloadSchema.safeParse({
      ...payload,
      eventID: "550e8400-e29b-41d4-a716-446655440000",
    }).success,
    true,
  );
  for (const change of [
    { eventID: "not-a-uuid" },
    { summary: "" },
    { formData: { ...payload.formData, email: "invalid" } },
    { formData: { ...payload.formData, businessName: "" } },
  ]) {
    assert.equal(
      intakeEmailPayloadSchema.safeParse({ ...payload, ...change }).success,
      false,
    );
  }
});

test("Drizzle-generated insert schemas remain compatible with Zod", () => {
  assert.equal(
    insertOrderSchema.safeParse({
      ...order,
      emailSent: false,
      emailMessageId: null,
      paymentStatus: null,
    }).success,
    true,
  );
  assert.equal(
    insertIntakeSubmissionSchema.safeParse({
      businessName: "Test Business",
      contactName: "Test Customer",
      email: "customer@example.com",
      emailSent: true,
      emailMessageId: "test-message",
    }).success,
    true,
  );
  assert.equal(insertOrderSchema.safeParse({}).success, false);
  assert.equal(insertIntakeSubmissionSchema.safeParse({}).success, false);
});
