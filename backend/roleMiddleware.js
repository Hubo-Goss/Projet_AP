const needsRole = function (req, res, next, role) {
    if (req.user.role === role[0] || req.user.role === role[1]) {
        console.log("Access allowed (right role)")
        next();
    }
    else {
        console.log("Access denied (wrong role)")
        res.send('Unauthorized')
    }
}

module.exports = needsRole;