import styled from "@emotion/styled";
import React from "react";
import "./styles.scss";

import Select from "react-dropdown-select";

const Label = styled("label")`
  padding: 0 0 4px;
  line-height: 1.5;
  display: block;
`;

export class DropDownGod extends React.Component {
  constructor(props) {
    const {
      multi = false,
      create = false,
      labelName = "-",
      loading = false,
      options = [],
      labelField = "label",
      valueField,
      initialValue: [],
    } = props;
    super(props);

    this.state = {
      multi: multi,
      disabled: false,
      loading: loading,
      contentRenderer: false,
      dropdownRenderer: false,
      options: options,
      inputRenderer: false,
      itemRenderer: false,
      optionRenderer: false,
      noDataRenderer: false,
      placeholder: multi ? "+ Click to add" : "Click to select",
      addPlaceholder: multi ? "+ Click to add" : "Change",
      labelName: labelName,
      selectValues: [],
      searchBy: "title",
      clearable: true,
      searchable: true,
      create: create,
      separator: false,
      forceOpen: false,
      handle: true,
      labelField: labelField,
      valueField: valueField ?? labelField,
      color: "#1677ff",
      keepSelectedInList: true,
      closeOnSelect: false,
      dropdownPosition: "bottom",
      direction: "ltr",
      dropdownHeight: "300px",
    };
  }

  setValues = (selectValues) => {
    this.setState({ selectValues });
    this.props.onChange({ selectValues });
  };

  contentRenderer = ({ props, state }) => {
    return (
      <div>
        {state.values.length} of {props.options.length} Selected
      </div>
    );
  };

  noDataRenderer = () => {
    return (
      <p style={{ textAlign: "center" }}>
        <strong>Ooops!</strong> No data found
      </p>
    );
  };

  itemRenderer = ({ item, itemIndex, props, state, methods }) => (
    <div key={item[props.valueField]} onClick={() => methods.addItem(item)}>
      <div style={{ margin: "10px" }}>
        <input type="checkbox" checked={methods.isSelected(item)} />
        &nbsp;&nbsp;&nbsp;{item[props.labelField]}
      </div>
    </div>
  );

  dropdownRenderer = ({ props, state, methods }) => {
    const regexp = new RegExp(state.search, "i");

    return (
      <div>
        <SearchAndToggle color={this.state.color}>
          <Buttons>
            <div>Search and select:</div>
            {methods.areAllSelected() ? (
              <Button className="clear" onClick={methods.clearAll}>
                Clear all
              </Button>
            ) : (
              <Button onClick={methods.selectAll}>Select all</Button>
            )}
          </Buttons>
          <input
            type="text"
            value={state.search}
            onChange={methods.setSearch}
            placeholder="Type anything"
          />
        </SearchAndToggle>
        <Items>
          {props.options
            .filter((item) =>
              regexp.test(item[props.searchBy] || item[props.labelField])
            )
            .map((option) => {
              if (
                !this.state.keepSelectedInList &&
                methods.isSelected(option)
              ) {
                return null;
              }

              return (
                <Item
                  disabled={option.disabled}
                  key={option[props.valueField]}
                  onClick={
                    option.disabled ? null : () => methods.addItem(option)
                  }
                >
                  <input
                    type="checkbox"
                    onChange={() => methods.addItem(option)}
                    checked={state.values.indexOf(option) !== -1}
                  />
                  <ItemLabel>{option[props.labelField]}</ItemLabel>
                </Item>
              );
            })}
        </Items>
      </div>
    );
  };

  optionRenderer = ({ option, props, state, methods }) => (
    <React.Fragment>
      <div onClick={(event) => methods.removeItem(event, option, true)}>
        {option.label}
      </div>
    </React.Fragment>
  );

  inputRenderer = ({ props, state, methods }) => (
    <input
      tabIndex="1"
      className="react-dropdown-select-input"
      size={methods.getInputSize()}
      value={state.search}
      onClick={() => methods.dropDown("open")}
      onChange={methods.setSearch}
      placeholder="Type in"
    />
  );

  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log("prevState", prevState);
  }

  render() {
    return (
      <div className={this.props.className}>
        <div>
          <div style={{ maxWidth: "100%", margin: "0 auto" }}>
            <Label>{this.state.labelName}</Label>
            <StyledSelect
              placeholder={this.state.placeholder}
              addPlaceholder={this.state.addPlaceholder}
              color={this.state.color}
              disabled={this.state.disabled}
              loading={this.state.loading}
              searchBy={this.state.searchBy}
              separator={this.state.separator}
              clearable={this.state.clearable}
              searchable={this.state.searchable}
              create={this.state.create}
              keepOpen={this.state.forceOpen}
              dropdownHandle={this.state.handle}
              dropdownHeight={this.state.dropdownHeight}
              direction={this.state.direction}
              multi={this.state.multi}
              values={[]}
              labelField={this.state.labelField}
              valueField={this.state.valueField}
              options={this.state.options}
              dropdownGap={5}
              keepSelectedInList={this.state.keepSelectedInList}
              onDropdownOpen={() => undefined}
              onDropdownClose={() => undefined}
              onClearAll={() => undefined}
              onSelectAll={() => undefined}
              onChange={(values) => this.setValues(values)}
              noDataLabel="No matches found"
              closeOnSelect={this.state.closeOnSelect}
              noDataRenderer={
                this.state.noDataRenderer
                  ? () => this.noDataRenderer()
                  : undefined
              }
              dropdownPosition={this.state.dropdownPosition}
              itemRenderer={
                this.state.itemRenderer
                  ? (item, itemIndex, props, state, methods) =>
                      this.itemRenderer(item, itemIndex, props, state, methods)
                  : undefined
              }
              inputRenderer={
                this.state.inputRenderer
                  ? (props, state, methods) =>
                      this.inputRenderer(props, state, methods)
                  : undefined
              }
              optionRenderer={
                this.state.optionRenderer
                  ? (option, props, state, methods) =>
                      this.optionRenderer(option, props, state, methods)
                  : undefined
              }
              contentRenderer={
                this.state.contentRenderer
                  ? (innerProps, innerState) =>
                      this.contentRenderer(innerProps, innerState)
                  : undefined
              }
              dropdownRenderer={
                this.state.dropdownRenderer
                  ? (innerProps, innerState, innerMethods) =>
                      this.dropdownRenderer(
                        innerProps,
                        innerState,
                        innerMethods
                      )
                  : undefined
              }
            />
          </div>
        </div>
      </div>
    );
  }
}

const StyledSelect = styled(Select)`
  ${({ dropdownRenderer }) =>
    dropdownRenderer &&
    `
		.react-dropdown-select-dropdown {
			overflow: initial;
		}
	`}
`;

const SearchAndToggle = styled.div`
  display: flex;
  flex-direction: column;

  input {
    margin: 10px 10px 0;
    line-height: 30px;
    padding: 0 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    :focus {
      outline: none;
      border: 1px solid ${({ color }) => color};
    }
  }
`;

const Items = styled.div`
  overflow: auto;
  min-height: 10px;
  max-height: 200px;
`;

const Item = styled.div`
  display: flex;
  margin: 10px;
  align-items: baseline;
  cursor: pointer;
  border-bottom: 1px dotted transparent;

  :hover {
    border-bottom: 1px dotted #ccc;
  }

  ${({ disabled }) =>
    disabled
      ? `
  	opacity: 0.5;
  	pointer-events: none;
  	cursor: not-allowed;
  `
      : ""}
`;

const ItemLabel = styled.div`
  margin: 5px 10px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;

  & div {
    margin: 10px 0 0 10px;
    font-weight: 600;
  }
`;

const Button = styled.button`
  background: none;
  border: 1px solid #555;
  color: #555;
  border-radius: 3px;
  margin: 10px 10px 0;
  padding: 3px 5px;
  font-size: 10px;
  text-transform: uppercase;
  cursor: pointer;
  outline: none;

  &.clear {
    color: tomato;
    border: 1px solid tomato;
  }

  :hover {
    border: 1px solid deepskyblue;
    color: deepskyblue;
  }
`;

const StyledHtmlSelect = styled.select`
  padding: 0;
  margin: 0 0 0 10px;
  height: 23px !important;
  color: #0071dc;
  background: #fff;
  border: 1px solid #0071dc;
`;
