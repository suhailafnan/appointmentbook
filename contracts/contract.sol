// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract AppointmentBook {
    struct Appointment {
        address user;
        string note;
        uint256 timestamp;
    }

    Appointment[] private appointments;

    // Create a new appointment with a note
    function addAppointment(string calldata note) external {
        appointments.push(Appointment({
            user: msg.sender,
            note: note,
            timestamp: block.timestamp
        }));
    }

    // Get number of appointments
    function getAppointmentCount() external view returns (uint256) {
        return appointments.length;
    }

    // Read a specific appointment
    function getAppointment(uint256 index)
        external
        view
        returns (address user, string memory note, uint256 timestamp)
    {
        require(index < appointments.length, "Invalid index");
        Appointment storage a = appointments[index];
        return (a.user, a.note, a.timestamp);
    }
}
