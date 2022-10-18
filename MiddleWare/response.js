
const errorResponse = (res, status, error) => {
 return res.status(status|| 500).json({
    error: error||{},
    status: status
  });
};
module.exports = { errorResponse };
