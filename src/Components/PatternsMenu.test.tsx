import {render, screen} from "@testing-library/react";
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
})