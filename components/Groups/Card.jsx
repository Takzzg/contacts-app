import { useContext, useEffect, useState } from "react"
import { useDrop } from "react-dnd"
import styled, { css } from "styled-components"
import { MyContext } from "../Context"

import {
    FaAngleDown,
    FaAngleRight,
    FaTimes,
    FaUser,
    FaUsers
} from "react-icons/fa"
import { Delete, Edit } from "../Buttons"

const StyledGroup = styled.div`
    display: flex;
    flex-direction: column;
    background-color: rgba(255, 255, 255, 0.05);

    .header {
        display: flex;
        justify-content: space-between;

        .name {
            padding: 1rem;
            font-size: 1.25rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
        }
    }

    .desc {
        padding: 0.5rem;
    }

    .contacts {
        .title {
            display: flex;
            align-items: center;
            font-size: 1.1rem;
            cursor: pointer;
            padding: 1rem;

            .arrow {
                display: flex;
                align-items: center;
                justify-content: center;
            }

            &:hover {
                background-color: rgba(64, 224, 208, 0.5);
            }
        }

        .details {
            display: flex;
            flex-direction: column;
            padding: 0.5rem;
            gap: 0.5rem;

            .contact {
                display: flex;
                align-items: center;
                justify-content: space-between;

                .info {
                    display: grid;
                    grid-template-columns: auto 1fr;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                }

                .remove {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0.5rem;
                    cursor: pointer;

                    &:hover {
                        background-color: red;
                    }
                }
            }
        }

        ${({ isActive }) =>
            isActive
                ? css`
                      .title {
                          background-color: rgba(64, 224, 208, 0.5);
                      }
                  `
                : css`
                      .details {
                          display: none;
                      }
                  `};
    }
`

const Group = ({ group }) => {
    const [isActive, setIsActive] = useState(false)
    const [contactsDetails, setContactsDetails] = useState([])

    const {
        contacts,
        groups,
        addContactToGroup,
        editGroup,
        deleteGroup,
        filters,
        filterContactsByGroup,
        removeContactFromGroup
    } = useContext(MyContext)

    useEffect(() => {
        let details = []
        group.contacts.forEach((id) =>
            details.push(contacts.find((c) => c.id === id))
        )
        setContactsDetails(details)
    }, [contacts, group.contacts])

    useEffect(() => {
        setIsActive(filters.contacts.byGroup === group.id)
    }, [filters.contacts.byGroup, group.id])

    const handleToggleGroup = () => {
        if (filters.contacts.byGroup !== group.id)
            filterContactsByGroup(group.id)
        else filterContactsByGroup(null)
    }

    const [collected, drop] = useDrop(
        () => ({
            accept: "Contact",
            collect: (monitor) => ({
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop()
            }),
            drop: (item) => {
                addContactToGroup(item.id, group.id)
            }
        }),
        [contacts, groups]
    )

    return (
        <StyledGroup isActive={isActive} ref={drop} {...collected}>
            <div className="header">
                <span className="name">
                    <FaUsers />
                    {group.name}
                </span>
                <div className="buttons">
                    <Edit onClick={() => editGroup(group.id)} />
                    <Delete onClick={() => deleteGroup(group.id)} />
                    {/* <button onClick={() => editGroup(group.id)}>Edit</button>
                    <button onClick={() => deleteGroup(group.id)}>
                        Delete
                    </button> */}
                </div>
            </div>

            <span className="desc">{group.desc}</span>
            <span className="contacts">
                <div className="title" onClick={handleToggleGroup}>
                    <span className="arrow">
                        {isActive ? <FaAngleDown /> : <FaAngleRight />}
                    </span>
                    {group.contacts.length} participants
                </div>
                <div className="details">
                    {contactsDetails.length
                        ? contactsDetails.map((c) => (
                              <div className="contact" key={c.id}>
                                  <div className="info">
                                      <FaUser />
                                      {c.name.last}, {c.name.first} - {c.phone}
                                  </div>
                                  <div
                                      className="remove"
                                      onClick={() =>
                                          removeContactFromGroup(c.id, group.id)
                                      }
                                  >
                                      <FaTimes />
                                  </div>
                              </div>
                          ))
                        : "This group is empty"}
                </div>
            </span>
        </StyledGroup>
    )
}

export default Group
