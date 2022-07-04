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
import { Delete, Edit, IconButton } from "../Buttons"

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

        .buttons {
            display: flex;
            gap: 00.25rem;
            align-items: flex-start;
        }
    }

    .desc {
        padding: 0.5rem;
    }

    .contacts {
        .title {
            width: 100%;
            text-align: left;
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
                </div>
            </div>

            <span className="desc">{group.desc}</span>
            <span className="contacts">
                <IconButton
                    className="title"
                    onClick={handleToggleGroup}
                    text={`${group.contacts.length} participants`}
                    Icon={isActive ? FaAngleDown : FaAngleRight}
                />
                <div className="details">
                    {contactsDetails.length
                        ? contactsDetails.map((c) => (
                              <div className="contact" key={c.id}>
                                  <div className="info">
                                      <FaUser />
                                      {c.name.last}, {c.name.first} - {c.phone}
                                  </div>
                                  <IconButton
                                      onClick={() =>
                                          removeContactFromGroup(c.id, group.id)
                                      }
                                      Icon={FaTimes}
                                  />
                              </div>
                          ))
                        : "This group is empty"}
                </div>
            </span>
        </StyledGroup>
    )
}

export default Group
