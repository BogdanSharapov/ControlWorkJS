//import { trips } from '.trips.js';




//export default class TripsModel {
 //boardtrips = trips;


/* getTasks() {
   return this.boardtasks;
 }
}*/
class Trip {
    constructor(destination, date, notes, status) {
        this.destination = destination;
        this.date = date;
        this.notes = notes;
        this.status = status;
    }
}

class TripModel {
    constructor() {
        this.trips = [];
    }

    addTrip(trip) {
        this.trips.push(trip);
    }

    removeTrip(index) {
        this.trips.splice(index, 1);
    }

    updateTrip(index, trip) {
        this.trips[index] = trip;
    }

    getTrips() {
        return this.trips;
    }
}

class TripView {
    constructor() {
        this.tripListElement = document.getElementById('trip-list');
        this.tripFormElement = document.getElementById('trip-form');
        this.dateFilterFromElement = document.getElementById('date-from');
        this.dateFilterToElement = document.getElementById('date-to');
        this.completedFilterElement = document.getElementById('completed-filter');
        this.tripIndexElement = document.getElementById('trip-index');
        this.formTitleElement = document.getElementById('form-title');
    }

    displayTrips(trips) {
        this.tripListElement.innerHTML = '';
        trips.forEach((trip, index) => {
            const li = document.createElement('li');
            li.innerHTML = `${trip.destination} - ${trip.date} - ${trip.notes} 
                <button class="edit-btn" data-index="${index}">Редактировать</button> 
                <button class="delete-btn" data-index="${index}">Удалить</button>`;
            this.tripListElement.appendChild(li);
        });
    }

    clearForm() {
        this.tripFormElement.reset();
        this.tripIndexElement.value = '';
        this.formTitleElement.textContent = 'Добавить новую поездку';
    }

    fillFormWithTripData(trip, index) {
        this.tripFormElement.elements['trip-destination'].value = trip.destination;
        this.tripFormElement.elements['trip-date'].value = trip.date;
        this.tripFormElement.elements['trip-notes'].value = trip.notes;
        this.tripFormElement.elements['trip-status'].value = trip.status;
        this.tripIndexElement.value = index;
        this.formTitleElement.textContent = 'Редактировать поездку';
    }

    getFormData() {
        const destination = this.tripFormElement.elements['trip-destination'].value;
        const date = this.tripFormElement.elements['trip-date'].value;
        const notes = this.tripFormElement.elements['trip-notes'].value;
        const status = this.tripFormElement.elements['trip-status'].value;

        return new Trip(destination, date, notes, status);
    }
}

class TripPresenter {
    constructor(view, model) {
        this.view = view;
        this.model = model;

        this.view.tripFormElement.addEventListener('submit', this.saveTrip.bind(this));
        this.view.tripListElement.addEventListener('click', this.handleTripActions.bind(this));
        document.getElementById('filter-btn').addEventListener('click', this.filterTrips.bind(this));
        this.view.completedFilterElement.addEventListener('change', this.filterByStatus.bind(this));
    }

    saveTrip(event) {
        event.preventDefault();
        const trip = this.view.getFormData();
        const index = this.view.tripIndexElement.value;

        if (index) {
            this.model.updateTrip(index, trip);
        } else {
            this.model.addTrip(trip);
        }
        this.view.displayTrips(this.model.getTrips());
        this.view.clearForm();
    }

    handleTripActions(event) {
        if (event.target.classList.contains('delete-btn')) {
            const index = event.target.getAttribute('data-index');
            this.model.removeTrip(index);
            this.view.displayTrips(this.model.getTrips());
        } else if (event.target.classList.contains('edit-btn')) {
            const index = event.target.getAttribute('data-index');
            const trip = this.model.getTrips()[index];
            this.view.fillFormWithTripData(trip, index);
        }
    }

    filterTrips() {
        const startDate = this.view.dateFilterFromElement.value;
        const endDate = this.view.dateFilterToElement.value;

        const filteredTrips = this.model.getTrips().filter(trip => {
            return (new Date(trip.date) >= new Date(startDate)) && (new Date(trip.date) <= new Date(endDate));
        });
        this.view.displayTrips(filteredTrips);
    }

    filterByStatus() {
        const showCompleted = this.view.completedFilterElement.checked;
        const filteredTrips = showCompleted 
            ? this.model.getTrips().filter(trip => trip.status === 'Completed') 
            : this.model.getTrips();
        this.view.displayTrips(filteredTrips);
    }
}

const app = new TripPresenter(new TripView(), new TripModel());