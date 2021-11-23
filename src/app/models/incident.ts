export interface Incident{
    address:         Address;
    apparatus:       Apparatus[];
    description:     Description;
    fire_department: FireDepartment;
    version:         string;
}

export interface Address {
    address_id:        string;
    address_line1:     string;
    city:              string;
    common_place_name: string;
    cross_street1:     string;
    cross_street2:     string;
    first_due:         string;
    geohash:           string;
    latitude:          number;
    longitude:         number;
    name:              string;
    number:            string;
    postal_code:       string;
    prefix_direction:  string;
    response_zone:     string;
    state:             string;
    suffix_direction:  string;
    type:              string;
}

export interface Apparatus {
    car_id:        string;
    extended_data: ApparatusExtendedData;
    geohash:       string;
    personnel:     any[];
    shift:         string;
    station:       string;
    unit_id:       string;
    unit_status:   UnitStatus;
    unit_type:     string;
}

export interface ApparatusExtendedData {
    event_duration:    number;
    response_duration: number;
    travel_duration:   number;
    turnout_duration:  number;
}

export interface UnitStatus {
    acknowledged?: Acknowledged;
    arrived:       Acknowledged;
    available:     Acknowledged;
    cleared:       Acknowledged;
    dispatched:    Acknowledged;
    enroute:       Acknowledged;
    "~":           Acknowledged;
}

export interface Acknowledged {
    geohash:   string;
    latitude:  number;
    longitude: number;
    timestamp: Date;
}

export interface Description {
    comments:              string;
    day_of_week:           string;
    event_closed:          Date;
    event_id:              string;
    event_opened:          Date;
    extended_data:         DescriptionExtendedData;
    first_unit_arrived:    Date;
    first_unit_dispatched: Date;
    first_unit_enroute:    Date;
    hour_of_day:           number;
    incident_number:       string;
    loi_search_complete:   Date;
    subtype:               string;
    type:                  string;
}

export interface DescriptionExtendedData {
    dispatch_duration: number;
    event_duration:    number;
    response_time:     number;
}

export interface FireDepartment {
    fd_id:        string;
    firecares_id: string;
    name:         string;
    shift:        string;
    state:        string;
    timezone:     string;
}
