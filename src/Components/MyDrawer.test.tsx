import MyDrawer from "./MyDrawer";
import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import {store} from "../redux/store";
import {configureStore} from "@reduxjs/toolkit";

describe('MyDrawer', () => {

    it('should render', () => {
        render(
            <Provider store={store}>
                <MyDrawer
                    headerLabel={"foo"}
                    width={"200px"}
                >
                </MyDrawer>
            </Provider>
        )

        //expect(screen.getByTestId('my-drawer-test-id')).toBeInTheDocument();
    })

})