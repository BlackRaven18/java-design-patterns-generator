import {fireEvent, render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import {store} from "../redux/store";
import PatternsMenu from "./PatternsMenu";

describe('PatternsMenu', () => {


    it("should render", () => {
        render(
            <Provider store={store}>
                <PatternsMenu/>
            </Provider>
        )

        expect(screen.getByTestId("patterns-menu-test-id")).toBeInTheDocument();
    })

    it("should change pattern family", () => {
        render(
            <Provider store={store}>
                <PatternsMenu/>
            </Provider>
        )

        const patternFamily = screen.getByText("foo");
        fireEvent.click(patternFamily);
    })

    it("should change pattern", () => {
        render(
            <Provider store={store}>
                <PatternsMenu/>
            </Provider>
        )

        const patternFamily = screen.getByText("foo");
        fireEvent.click(patternFamily);

        const pattern = screen.getByText("fooPattern2");
        fireEvent.click(pattern);
    })
})