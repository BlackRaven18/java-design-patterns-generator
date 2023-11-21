import {fireEvent, render, screen} from "@testing-library/react";
import TopBar from "../TopBar";
import {Provider} from "react-redux";
import {store} from "../../redux/store";
import MyDrawer from "../MyDrawer";

describe('TopBar', () => {

    it('should render', () => {
        render(
            <Provider store={store}>
                <TopBar/>
            </Provider>
        )

        expect(screen.getByTestId("top-bar-test-id")).toBeInTheDocument();
    })

    it('should open drawer', () => {
        render(
            <Provider store={store}>
                <TopBar/>
                <MyDrawer headerLabel={'foo'} width={"200px"}/>
            </Provider>
        )

        expect(screen.getByTestId("top-bar-test-id")).toBeInTheDocument();

        fireEvent.click(screen.getByTestId('drawer-button-test-id'));

        expect(screen.getByTestId('my-drawer-test-id')).toBeInTheDocument();
    })
})