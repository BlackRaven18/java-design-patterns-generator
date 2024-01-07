import {fireEvent, render, screen, within} from "@testing-library/react";
import {Provider} from "react-redux";
import {store} from "../../redux/store";
import SelectParam from "./SelectParam";


describe('SelectParam', () => {

    it('should render', () => {
        render(
            <Provider store={store}>
                <SelectParam
                    index={0}
                    label={'foo'}
                    fileNameToBeMultiplied={"foo"}
                    minValue={1}
                    maxValue={5}
                    currentValue={1}
                    disabled={false}
                />
            </Provider>
        )
        expect(screen.getByTestId("select-param-test-id")).toBeInTheDocument();
    })

    it('should change value', () => {
        render(
            <Provider store={store}>
                <SelectParam
                    index={0}
                    label={'foo'}
                    fileNameToBeMultiplied={""}
                    minValue={1}
                    maxValue={5}
                    currentValue={1}
                    disabled={false}
                />
            </Provider>
        )

        fireEvent.mouseDown(screen.getByRole("combobox"));
        const listBox = within(screen.getByRole('listbox'));
        fireEvent.click(listBox.getByText("2"));
        expect(screen.getByRole("combobox")).toHaveTextContent("2");

    })

})