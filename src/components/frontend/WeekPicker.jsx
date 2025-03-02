import { Button, ButtonGroup } from "react-bootstrap";
import { getAdjacentWeek, formatDateRange, getCurrentWeekRange } from "../../utils/dateHelpers";

const WeekPicker = ({ week, onChange }) => {
    const disableNext = week.end >= getCurrentWeekRange().end;

    return (
        <div className="week-picker">
            <ButtonGroup>
                <Button
                    variant="outline-primary"
                    onClick={() => onChange('prev')}
                >
                    ←
                </Button>
                
                <div className="date-range">
                    {formatDateRange(week.start, week.end)}
                </div>

                <Button
                    variant="outline-primary"
                    onClick={() => onChange('next')}
                    disabled={disableNext}
                >
                    →
                </Button>
            </ButtonGroup>
        </div>
    );
};

export default WeekPicker;