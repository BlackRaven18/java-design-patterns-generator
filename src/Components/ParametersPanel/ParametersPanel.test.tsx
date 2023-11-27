import {fireEvent, render, screen} from "@testing-library/react";
import {Provider, useDispatch} from "react-redux";
import {store} from "../../redux/store";
import ParametersPanel from "./ParametersPanel";

describe('ParametersPanel', () => {

    it('should render', () => {

        render(
            <Provider store={store}>
                <ParametersPanel/>
            </Provider>
        )

        expect(screen.getByTestId('parameters-panel-test-id')).toBeInTheDocument();
    })

    it('should change filename input content', () => {
        render(
            <Provider store={store}>
                <ParametersPanel/>
            </Provider>
        )

        const fileNameInput = screen.getByTestId('parameters-panel-file-name-text-field');
        fireEvent.change(fileNameInput, {target: {value: 'foo'}})

        expect(fileNameInput).toHaveAttribute("value", "foo");

    })

    it('should change invoke param onChange()', () => {
        render(
            <Provider store={store}>
                <ParametersPanel/>
            </Provider>
        )

        const paramField = screen.getByTestId('param-text-field-test-id');

        fireEvent.change(paramField, {target: {value: 'foo'}})
        expect(paramField).toBeInTheDocument();
        //expect(paramField).toHaveAttribute("value", "foo")
        console.log(paramField.getAttributeNames());

    })

})