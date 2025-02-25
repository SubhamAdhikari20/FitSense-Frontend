import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Button} from "react-bootstrap";
import LayoutDashboard from "../../components/layouts/dashboard_layout/LayoutDashboard";
import AdminTrainerSection from './AdminTrainerSection.jsx';

const AdminTrainer = () => {
    return (
        <>
            <LayoutDashboard>
                <AdminTrainerSection />
            </LayoutDashboard>
        </>
    );
};

export default AdminTrainer;
