import React from "react";

export default function Comments(props){

    return (
        <div className="row m-3 justify-content-center">
            <div className="col-8 p-2 mb-2">
                <div className="">
                    <p className="m-0" style={{fontWeight: "bold"}}>MA-ARUF BURAD SAYS</p>
                    <p style={{fontStyle: "italic"}}>June 18, 2022</p>
                    <div>
                        <div>
                            <p>{props.commentText}</p>
                                {/* <p>he talks about the side hustles and strange ways to have a healthy and constant income. The website talks about how the wife from the couple escaped her 9 to 5 job and how they have a stable income source without having a full-time job. </p> */}
                        </div>
                        <a href="#" style={{textDecoration:"underline"}}>Reply</a>
                        <hr />
                    </div>
                </div>
            </div>
        </div>
    );
};