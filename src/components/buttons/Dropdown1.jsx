import React, { useState, useRef, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";

const Dropdown1 = ({ options, onSelect, selectedValue, children, className = '', textClassName = '' }) => {
    const [selectedLabel, setSelectedLabel] = useState(children || "Select");
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [searchTerm, setSearchTerm] = useState("");
    const dropdownRef = useRef(null);
    const menuRef = useRef(null);

    // Update internal state when the controlled prop changes
    useEffect(() => {
        if (selectedValue) {
            setSelectedLabel(selectedValue);
        }
    }, [selectedValue]);

    // Filter options based on search term
    const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelect = (eventKey) => {
        const selectedOption = options.find(option => option.value === eventKey);
        if (selectedOption) {
            setSelectedLabel(selectedOption.label);
            setSearchTerm("");
        }
        if (onSelect) {
            onSelect(eventKey);
        }
        setIsOpen(false);
    };


    const handleKeyDown = (e) => {
        if (!isOpen) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setHighlightedIndex((prev) =>
                    prev < filteredOptions.length - 1 ? prev + 1 : 0
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setHighlightedIndex((prev) =>
                    prev > 0 ? prev - 1 : filteredOptions.length - 1
                );
                break;
            case 'Enter':
                if (highlightedIndex !== -1) {
                    handleSelect(filteredOptions[highlightedIndex].value);
                }
                break;
            case 'Escape':
                setIsOpen(false);
                break;
        }
    };



    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, highlightedIndex, filteredOptions]);

    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <div
            ref={dropdownRef}
            onClick={(e) => {
                e.preventDefault();
                setIsOpen(!isOpen);
                onClick(e);
            }}
            style={{
                cursor: 'pointer',
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <span
                ref={ref}
                className={`dropdown-toggle-wrapper ${className}`}
                style={{ cursor: 'pointer' }}
            >
                {children}
            </span>
            <span style={{ marginLeft: '5px' }}>&#x25bc;</span>
        </div>
    ));

    const CustomMenu = React.forwardRef(
        ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
            return (
                <div
                    ref={menuRef}
                    style={style}
                    className={className}
                    aria-labelledby={labeledBy}
                >
                    <Form.Control
                        autoFocus
                        className="mx-3 my-2 w-auto"
                        placeholder="Type to filter..."
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setHighlightedIndex(0);
                        }}
                        value={searchTerm}
                    />
                    <ul className="list-unstyled">
                        {filteredOptions.map((option, index) => (
                            <Dropdown.Item
                                key={option.value}
                                eventKey={option.value}
                                active={index === highlightedIndex}
                                style={{
                                    backgroundColor: index === highlightedIndex
                                        ? 'aqua'
                                        : 'transparent'
                                }}
                            >
                                {option.label}
                            </Dropdown.Item>
                        ))}
                    </ul>
                </div>
            );
        }
    );

    return (
        <Dropdown show={isOpen} onSelect={handleSelect}>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                {selectedLabel}
            </Dropdown.Toggle>

            <Dropdown.Menu as={CustomMenu}>
                {filteredOptions.map((option) => (
                    <Dropdown.Item key={option.value} eventKey={option.value}>
                        {option.label}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default Dropdown1;