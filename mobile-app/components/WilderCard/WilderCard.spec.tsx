import { render, screen } from "@testing-library/react-native";
import WilderCard from "./WilderCard";

describe("Wilders", () => {
  describe("when wilder is not approved", () => {
    const wilder = {
      id: "1234",
      firstName: "Jean",
      lastName: "Fictif",
      isApproved: false,
    };

    it("displays Approve button", () => {
      render(<WilderCard {...wilder} />);
    });
  });
  describe("when wilder is approved", () => {
    it("displays Checked icon", () => {});
  });

  describe("when Approve button is clicked", () => {
    it("sends mutation to server", () => {});
  });
});
