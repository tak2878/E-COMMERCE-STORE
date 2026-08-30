using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ActionConstraints;

namespace API.Controllers;

public class BuggyController : BaseApiController
{
    [HttpGet("not-found")]
    public IActionResult GetNotFound()
    {
        return NotFound();  //404
    }

    [HttpGet("bad-request")]
    public IActionResult GetBadRequest()
    {
        return BadRequest("This is not a good request"); //400
    }

    [HttpGet("unauthorized")]
    public IActionResult GetUnauthorised()
    {
        return Unauthorized();   //401
    }

    [HttpGet("validation-error")]
    public IActionResult GetValidationError()
    {
        ModelState.AddModelError("Problem1", "This is the first error");
        ModelState.AddModelError("Problem2", "This is the Second error");
        return ValidationProblem();   //also 400 error in object form
    }

    [HttpGet("server-error")]
    public IActionResult GetServerError()
    {
        // throw new Exception("This is a server error");    //500
        return StatusCode(500, new
        {
            statusCode = 500,
            title = "This is a server error"
        });
    }
}