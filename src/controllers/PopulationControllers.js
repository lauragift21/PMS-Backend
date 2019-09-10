import Location from '../models/PopulationModel';

export default class PopulationController {
  /**
   * @description - create a new location
   * @param  {} req
   * @param  {} res
   */
  static async createLocation(req, res) {
    try {
      const { location, maleResidents, femaleResidents } = req.body;
       Location.findOne({ location }, (error, location) => {
        if (location) {
          return res.status(409).json({
            errors: {
              status: '409',
              message: 'Location already exists'
            }
          })
        }
      });
      const totalResidents = parseInt(maleResidents, 10) + parseInt(femaleResidents, 10);
      const newLocation = await Location.create({
        location,
        maleResidents,
        femaleResidents,
        totalResidents
      });

      if (newLocation) {
        return res.status(201).json({
          success: true,
          message: 'Location created succesfully',
          data: {
            newLocation
          }
        })
      }
    } catch (error) {
      res.status(500).json({
        errors: {
          status: '500',
          message: 'Internal server error'
        }
      });
    }
  }


  /**
   *  @description - Get all locations
   * @param  {} req
   * @param  {} res
   * @param  {'active'}
   */
  static async getLocations(req, res) {
    try {
      const locations = await Location.find().exec();
      if (!locations.length) {
        return res.status(404).json({
          errors: {
            status: '404',
            message: 'No locations available'
          }
        });
      }

      res.status(200).json({
        success: true,
        data: {
          locations
        }
      });

    } catch (error) {
      res.status(500).json({
        errors: {
          status: '500',
          message: 'Internal server error'
        }
      });
    }
  }

  /**
   * @param  {} req
   * @param  {} res
   * @param  {req.params.id}}
   */
  static async getOneLocation(req, res) {
    try {
      const locations = await Location.findById({ _id: req.params.id }).exec();
      if (!locations) {
        return res.status(404).json({
          errors: {
            status: '404',
            message: 'No locations available'
          }
        });
      }

      res.status(200).json({
        success: true,
        data: {
          locations
        }
      });
    } catch (error) {
      res.status(500).json({
        errors: {
          status: '500',
          message: 'Internal server error'
        }
      });
    }
  }

  /**
   * @param  {} req
   * @param  {} res
   * @param  {} req.body
   * @param  {{locations}} data
   */
  static async updateLocation(req, res) {
    try {
      const getLocation = await Location.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true },
        (error, location) => {
        if (!location) res.status(404).json({
          errors: {
            status: '404',
            message: 'Location not found'
          }
        })
      });
      if (getLocation) {
        res.status(200).json({
          success: true,
          message: 'Location updated successfully',
          data: {
            getLocation
          }
        })
      }
    } catch (error) {
      res.status(500).json({
        errors: {
          status: '500',
          message: 'Internal server error'
        }
      });
    }
  }

  static async deleteLocation(req, res) {
    try {
        await Location.findByIdAndDelete(
          { _id: req.params.id },
          (error, location) => {
          if (!location) res.status(404).json({
            errors: {
              status: '404',
              message: 'Location not found'
            }
          })
          if (location) {
            res.status(200).json({
              success: true,
              message: 'Location deleted successfully',
              data: {
                location
              }
            })
          }
      });
    } catch (error) {
      res.status(500).json({
        errors: {
          status: '500',
          message: error.message
        }
      });
    }
  }
}
