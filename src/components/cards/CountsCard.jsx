import React from 'react';
import styled from "styled-components";
import './../../styles/cards_styles/CountsCardStyle.css';

const getNestedValue = (obj, path) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj) || 0;
};

const CountsCard = ({ item, stats }) => {
    const rawValue = getNestedValue(stats, item.key);
    const numericValue = parseFloat(rawValue) || 0;
    return (
        <div className="card">
            <div className="left">
                <div className="title">{item.name}</div>

                <div className="value">
                    {Number.isInteger(numericValue)
                        ? numericValue
                        : numericValue.toFixed(2)}
                    {/* {value.toFixed(2)} */}
                    {/* {data && data[item.category].toFixed(2)} */}
                    <div className="unit">{item.unit}</div>
                    {/* <div className={`span ${item.positive ? "positive" : "negative"}`}>
                        (+10%)
                    </div> */}
                </div>

                <div className="desc">{item.desc}</div>
            </div>

            <div className="icon" style={{ background: item.lightColor, color: item.color }}>
                {item.icon}
            </div>

        </div>

    );
};


export default CountsCard;
