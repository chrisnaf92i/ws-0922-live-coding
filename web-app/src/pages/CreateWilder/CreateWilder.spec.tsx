import React from "react";
import { BrowserRouter } from "react-router-dom";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import * as toastify from "react-toastify";

import { CreateWilderMutation } from "../../gql/graphql";
import CreateWilder, { CREATE_WILDER } from "./CreateWilder";

jest.mock("react-toastify");

const renderCreateWilder = (
  mocks: MockedResponse<CreateWilderMutation>[] = []
) => {
  return render(
    <MockedProvider mocks={mocks}>
      <div data-testid="wrapper">
        <CreateWilder />
      </div>
    </MockedProvider>,
    { wrapper: BrowserRouter }
  );
};

const fillFormAndSubmit = () => {
  fireEvent.change(screen.getByRole("textbox", { name: "Prénom" }), {
    target: { value: "Jean" },
  });
  fireEvent.change(screen.getByRole("textbox", { name: "Nom" }), {
    target: { value: "Wilder" },
  });
  fireEvent.submit(screen.getByRole("form"));
};

describe("CreateWilder", () => {
  it("renders correctly", () => {
    renderCreateWilder();

    expect(screen.getByTestId("wrapper")).toMatchInlineSnapshot(`
<div
  data-testid="wrapper"
>
  <h2
    class="sc-dkzDqf gezsyd"
  >
    Ajouter un nouveau Wilder
  </h2>
  <form
    aria-label="form"
  >
    <label>
      Prénom
      <br />
      <input
        id="firstName"
        name="firstName"
        required=""
        type="text"
        value=""
      />
    </label>
    <br />
    <label>
      Nom
      <br />
      <input
        id="lastName"
        name="lastName"
        required=""
        type="text"
        value=""
      />
    </label>
    <br />
    <button>
      Valider
    </button>
  </form>
</div>
`);
  });

  describe("when form submitted with fields filled-in", () => {
    const mockCreateWilderSuccess: MockedResponse<CreateWilderMutation> = {
      request: {
        query: CREATE_WILDER,
        variables: {
          firstName: "Jean",
          lastName: "Wilder",
        },
      },
      result: {
        data: {
          createWilder: {
            id: "1234",
            firstName: "Jean",
          },
        },
      },
    };

    describe("when server responds with success", () => {
      it("resets form fields", async () => {
        renderCreateWilder([mockCreateWilderSuccess]);
        fillFormAndSubmit();

        await waitFor(() => {
          expect(screen.getByRole("textbox", { name: "Prénom" })).toHaveValue(
            ""
          );
        });
        expect(screen.getByRole("textbox", { name: "Nom" })).toHaveValue("");
      });

      it("shows toast with success message", async () => {
        renderCreateWilder([mockCreateWilderSuccess]);
        fillFormAndSubmit();

        await waitFor(() => {
          expect(toastify.toast.success).toHaveBeenCalledTimes(1);
        });
        expect(toastify.toast.success).toHaveBeenCalledWith(
          "Wilder Jean Wilder créé avec succès."
        );
      });
    });

    describe("when server responds with error", () => {
      const ERROR_MESSAGE = "ERROR_MESSAGE";
      const mockCreateWilderError: MockedResponse<CreateWilderMutation> = {
        request: {
          query: CREATE_WILDER,
          variables: {
            firstName: "Jean",
            lastName: "Wilder",
          },
        },
        error: new Error(ERROR_MESSAGE),
      };

      it("shows toast with error message", async () => {
        renderCreateWilder([mockCreateWilderError]);
        fillFormAndSubmit();

        await waitFor(() => {
          expect(toastify.toast.error).toHaveBeenCalledTimes(1);
        });
        expect(toastify.toast.error).toHaveBeenCalledWith(ERROR_MESSAGE);
      });
    });
  });
});
