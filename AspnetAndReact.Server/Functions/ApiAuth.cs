using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace AspnetAndReact.Server.Functions
{
    public class ApiAuth: ActionFilterAttribute
    {
        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            string token = actionContext.Request.Headers.Authorization?.Parameter ?? "";
            Cryptography cryptoGraphy = new Cryptography();
            if (!cryptoGraphy.isTokenValid(token, ref actionContext))
            {
                actionContext.Response = actionContext.Request.CreateErrorResponse(System.Net.HttpStatusCode.Unauthorized, "Unauthorized!");
                return;
            }

            base.OnActionExecuting(actionContext);
        }
    }
}
