class Validation {
    pickupTimeThreeDash(value) {
        let count = 0;
        for (let i = 0; i < value.length; i++) {
            if (value[i] === "-") {
                count++;
            }
        }
        if (count === 2) {
            return true;
        }
        return false;
    }

    year4Month2Date2(value) {
        if (!this.pickupTimeThreeDash(value)) {
            return false;
        };
        let split = value.split("-");
        if (split[0].length !== 4) {
            return false;
        }
        if (split[1].length !== 2) {
            return false;
        }
        if (split[2].length !== 2) {
            return false;
        }
        return true;
    }

    isNumber(value) {
        let number = Number.parseInt(value);
        if (typeof number == "number") {
            return true;
        }
        return false;
    }

    phoneNumber(value) {
        if (!this.isNumber) {
            return false;
        }
        if (value.length !== 10) {
            return false;
        }
        return true;
    }

    email(value) {
        // TODO: warning to fix
        const regex = "(?=.{1,254}$)^[A-Za-z0-9._%+-]{1,64}@(?:[A-Za-z0-9-]{1,63}\.){1,125}[A-Za-z]{2,63}$";
        let found = value.match(regex)
        return found;
    }

    pickupTimeFormat(value) {
        let split = value.split(":");
        let count = 0;
        for (let i = 0; i < value.length; i++) {
            if (value[i] === ":") {
                count++;
            }
        }
        if (count !== 1) {
            return false;
        }
        if (split[0].length !== 2 || typeof Number.parseInt(split[0]) !== "number") {
            return false;
        }
        if (split[1].length !== 2 || typeof Number.parseInt(split[1]) !== "number") {
            return false;
        }
        return true;
    }

    pickupTime(value) {
        if (!this.pickupTimeFormat(value)){
            return false;
        }
        const openTime = 1200;
        const closeTime = 1830;
        let split = value.split(":");
        value = split.join("");
        value = Number.parseInt(value);
        if ( openTime <= value && value <= closeTime) {
            return true
        }
        return false;
    }

    pickupDateStopAtOct(value) {
        let date = new Date(value);
        let stopDate = new Date ("2019-10-06");
        return date.getTime() >= stopDate.getTime();
    }
}
export default new Validation;